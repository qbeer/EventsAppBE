import { Event } from "../model/Event";
import { EventService } from "../service/EventService";

export class EventController {

    constructor(private service: EventService) {}

    public listCalendars(): Promise<string[]> {
        return this.service.listCalendars();
    }

    public save(event: Event, id: string): Promise<Event> {
        return this.service.save(event, id);
    }

    public getAll(id: string): Promise<Event[]> {
        return this.service.getAll(id);
    }

    public updateEvent(id: string, event: Event): Promise<Event> {
        return this.service.updateEvent(id, event);
    }
}
