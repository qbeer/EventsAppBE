import { Event } from "../model/Event";
import { EventRepository } from "../repository/EventRepository";
import { EventService } from "../service/EventService";

export class EventController {

    constructor(private service: EventService) {}

    public save(event: Event) {
        return this.service.save(event);
    }

    public all(): Promise<Event[] | void> {
        return this.service.getAll();
    }
}
