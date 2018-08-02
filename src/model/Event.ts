
export class Event {
    // tslint:disable:member-access
    id?: number | undefined;

    title?: string | undefined;

    eventDate?: Date | undefined;

    timeZone?: string | undefined;

    eventDescription: string | undefined;

    eventHost: string | undefined;

    maxParticipants?: number | undefined;

    eventLocation: string | undefined;
}
