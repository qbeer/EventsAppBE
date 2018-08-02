import { Event } from "../model/Event";
import { EventService } from "../service/EventService";

export class EventController {

    constructor(private service: EventService) {}

    public save(event: Event): Promise<Event> {
        return this.service.save(event);
    }

    public getAll(): Promise<Event[]> {
        return this.service.getAll();
    }
}
