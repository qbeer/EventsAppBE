import { Event } from "../model/Event";
import { CalendarService } from "./CalendarService";

export class EventService {

    constructor(private service: CalendarService) {}

    public getAll(): Promise<Event[] | void> {
        return this.service.getUpcomingEvents();
    }

    public save(event: Event): Promise<Event | void> {
        return this.service.insertEvent(event);
    }

}
