import { Event } from "../model/Event";
import { CalendarService } from "./CalendarService";

export class EventService {

    constructor(private service: CalendarService) {}

    public getAll(): Promise<Event[]> {
        return this.service.getUpcomingEvents();
    }

    public save(event: Event): Promise<Event> {
        return this.service.insertEvent(event);
    }

}
