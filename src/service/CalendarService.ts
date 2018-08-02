import { OAuth2Client } from "google-auth-library";
import { calendar_v3, google } from "googleapis";
import { Event } from "../model/Event";

export class CalendarService {

    private calendar: calendar_v3.Calendar;

    constructor(client: OAuth2Client) {
        this.calendar = google.calendar({version: "v3", auth: client});
    }

    public getUpcomingEvents(): Promise<Event[]> {

        return this.calendar.events.list({
            calendarId: "primary",
            timeMin: (new Date()).toISOString(),
            // tslint:disable-next-line:object-literal-sort-keys
            singleEvents: true,
            orderBy: "startTime",
        }).then((res) => {
            const events = res.data.items;
            if (events.length) {
                const myEvents: Event[] = [];
                events.map((event) => {
                    const myEvent: Event = new Event();
                    myEvent.eventDescription = event.description;
                    myEvent.eventDate = new Date(event.start.dateTime);
                    myEvent.eventHost = event.organizer.displayName;
                    myEvent.eventLocation = event.location;
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

    public insertEvent(event: Event): Promise<Event> {
        event.eventDate = new Date();
        event.eventDate.setFullYear(2021);
        const myEvent = {
            summary: event.title,
            // tslint:disable-next-line:object-literal-sort-keys
            location: event.eventLocation,
            description: event.eventDescription,
            start: {
                dateTime: event.eventDate.toISOString(),
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: event.eventDate.toISOString(),
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
            calendarId: "primary",
            requestBody: myEvent,
        }).then((rEvent) => {
            return event;
        }).catch((err) => {
            console.log("Error adding event: " + err);
            throw err;
        });
    }

}
