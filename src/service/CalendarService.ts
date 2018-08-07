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
                    myEvent.id = event.id;
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

    public getEventById(id: string): Promise<Event> {
        return this.calendar.events.get({ calendarId: "primary", eventId: id }).then((event) => {
            const myEvent: Event = new Event();
            myEvent.id = event.data.id;
            myEvent.description = event.data.description;
            myEvent.date = event.data.start.dateTime;
            myEvent.host = event.data.organizer.displayName;
            myEvent.location = event.data.location;
            myEvent.title = event.data.summary;
            if (event.data.attendees) {
                myEvent.maxParticipants = event.data.attendees.length + 1;
            } else {
                myEvent.maxParticipants = 1;
            }
            return myEvent;
        }).catch((err) => {
            console.log("Error while getting event: " + err);
            throw err;
        });
    }

    public updateEvent(id: string, event: Event): Promise<Event> {
        return this.getEventById(id).then((myEvent) => {
            return this.calendar.events.update({
                calendarId: "primary", eventId: id, requestBody: {
                    summary: event.title ? event.title : myEvent.title,
                    // tslint:disable-next-line:object-literal-sort-keys
                    location: event.location ? event.location : myEvent.location,
                    description: event.description ? event.description : myEvent.description,
                    start: {
                        dateTime: event.date ? event.date : myEvent.date,
                        timeZone: "America/Los_Angeles",
                    },
                    end: {
                        dateTime: event.date ? event.date : myEvent.date,
                        timeZone: "America/Los_Angeles",
                    },
                },
                // tslint:disable-next-line:align
            }).then(() => {
                return event;
            }).catch((err) => {
                console.log("Error updateing evet: " + err);
                throw err;
            });
        }).catch((err) => {
            throw err;
        });
    }

}
