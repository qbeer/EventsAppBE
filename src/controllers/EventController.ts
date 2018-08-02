import { Event } from "../model/Event";
import { EventService } from "../service/EventService";

export class EventController {

    constructor(private service: EventService) {}

    public save(event: Event): Promise<Event | void> {
        return this.service.save(event);
    }

    public all(): Promise<Event[] | void> {
        return this.service.getAll();
    }
}
