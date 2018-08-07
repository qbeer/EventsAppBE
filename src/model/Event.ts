
export class Event {
    // tslint:disable:member-access
    id?: string | undefined;

    title?: string | undefined;

    date?: string | undefined;

    timeZone?: string | undefined;

    description: string | undefined;

    host: string | undefined;

    maxParticipants?: number | undefined;

    location: string | undefined;

    public toString() {
        return `Event[${this.title}, ${this.date}, ${this.description}, ${this.host}, ${this.location}]`;
    }
}
