
export class Event {
    // tslint:disable:member-access
    id?: number | undefined;

    title?: string | undefined;

    date?: Date | undefined;

    timeZone?: string | undefined;

    description: string | undefined;

    host: string | undefined;

    maxParticipants?: number | undefined;

    location: string | undefined;
}
