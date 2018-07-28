import { Event } from "../model/Event";
import { EventRepository } from "../repository/EventRepository";
import { CalendarService } from "./CalendarService";

export class EventService {

    constructor(private repository: EventRepository, private service: CalendarService) {}

    public getAll(): Promise<Event[] | void> {
        return this.service.getUpcomingEvents();
    }

    public save(event: Event) {
        return this.repository.save(event);
    }

}
