import { OAuth2Client } from "google-auth-library";
import { calendar_v3, google } from "googleapis";
import { Event } from "../model/Event";

export class CalendarService {

    private calendar: calendar_v3.Calendar;

    constructor(client: OAuth2Client) {
        this.calendar = google.calendar({ version: "v3", auth: client });
    }

    public getUpcomingEvents(id: string): Promise<Event[]> {

        return this.calendar.events.list({
            calendarId: id,
            timeMin: (new Date()).toISOString(),
            // tslint:disable-next-line:object-literal-sort-keys
            singleEvents: true,
            maxResults: 25,
            orderBy: "startTime",
        }).then((res) => {
            const events = res.data.items;
            if (events.length) {
                const myEvents: Event[] = [];
                events.map((event) => {
                    const myEvent: Event = new Event();
                    myEvent.description = event.description;
                    myEvent.date = event.start.dateTime;
                    myEvent.host = event.organizer.displayName;
                    myEvent.location = event.location;
                    myEvent.title = event.summary;
                    if (event.attendees) {
                        myEvent.maxParticipants = event.attendees.length + 1;
                    } else {
                        myEvent.maxParticipants = 1;
                    }
                    myEvents.push(myEvent);
                });
                return myEvents;
            } else {
                console.log("No upcoming events.");
                throw new Error();
            }
        }).catch((err) => {
            console.log("Error encountered during event listing: " + err);
            throw err;
        });
    }

    public insertEvent(event: Event, id: string): Promise<Event> {
        const myEvent = {
            summary: event.title,
            // tslint:disable-next-line:object-literal-sort-keys
            location: event.location,
            description: event.description,
            start: {
                dateTime: event.date,
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: event.date,
                timeZone: "America/Los_Angeles",
            },
            recurrence: [
                "RRULE:FREQ=DAILY;COUNT=1",
            ],
            attendees: [
            ],
            reminders: {
                useDefault: false,
                // tslint:disable-next-line:object-literal-sort-keys
                overrides: [
                    { method: "email", minutes: 24 * 60 },
                    { method: "popup", minutes: 10 },
                ],
            },
        };
        return this.calendar.events.insert({
            calendarId: id,
            requestBody: myEvent,
        }).then((rEvent) => {
            return event;
        }).catch((err) => {
            console.log("Error adding event: " + err);
            throw err;
        });
    }

    public listCalendars(): Promise<string[]> {
        return this.calendar.calendarList.list().then((list) => {
            const ids: string[] = [];
            list.data.items.forEach((item) => {
                ids.push(item.id);
            });
            return ids;
        });
    }

}
