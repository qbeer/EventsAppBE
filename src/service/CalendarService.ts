import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import { Event } from "../model/Event";
import { CalendarAuthService } from "./CalendarAuthService";

export class CalendarService {

    public getUpcomingEvents(): Promise<Event[] | void> {
        const service = new CalendarAuthService();
        const clientPromise = service.authorizedClient();
        return clientPromise.then((client: OAuth2Client) => {
            google.calendar({ version: "v3", auth: client }).events.list({
                calendarId: "primary",
                timeMin: (new Date()).toISOString(),
                // tslint:disable-next-line:object-literal-sort-keys
                maxResults: 10,
                singleEvents: true,
                orderBy: "startTime",
            }, (err, res) => {
                if (err) {
                    return new Promise(() => { console.log("The API returned an error: " + err); });
                }
                const events = res.data.items;
                if (events.length) {
                    console.log("#events", events.length);
                    const myEvents: Event[] = [];
                    events.map((event) => {
                        const myEvent: Event = new Event();
                        myEvent.eventDescription = event.description;
                        myEvent.eventDate = new Date(event.start.dateTime);
                        myEvent.eventHost = event.organizer.displayName;
                        myEvent.eventLocation = event.location;
                        myEvent.maxParticipants = event.attendees.length + 1;
                        myEvents.push(myEvent);
                    });
                    console.log(myEvents);
                    return new Promise((resolve) => { resolve(myEvents); });
                } else {
                    console.log("No upcoming events found.");
                    return new Promise(() => { console.log("No events."); });
                }
            });
        }).catch(() => {
            return console.log("Error listing evetns.");
        });
    }

    public insertEvent() {
        const event = {
            summary: "Google I/O 2019",
            // tslint:disable-next-line:object-literal-sort-keys
            location: "800 Howard St., San Francisco, CA 94103",
            description: "A chance to hear more about Google's developer products.",
            start: {
                dateTime: "2019-05-28T09:00:00-07:00",
                timeZone: "America/Los_Angeles",
            },
            end: {
                dateTime: "2019-05-28T17:00:00-07:00",
                timeZone: "America/Los_Angeles",
            },
            recurrence: [
                "RRULE:FREQ=DAILY;COUNT=1",
            ],
            attendees: [
                { email: "lpage@example.com" },
                { email: "sbrin@example.com" },
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
        /*
                this.gCalendar.events.insert({
                    calendarId: "primary",
                    resource: event,
                }, (err, returnedEvent) => {
                    if (err) {
                        console.log("There was an error contacting the Calendar service: " + err);
                        return;
                    }
                    console.log("Event created: %s", returnedEvent.htmlLink);
                });
                */
    }

}
