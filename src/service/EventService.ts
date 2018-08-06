import { Event } from "../model/Event";
import { CalendarService } from "./CalendarService";

export class EventService {

    constructor(private service: CalendarService) {}

    public getAll(id: string): Promise<Event[]> {
        return this.service.getUpcomingEvents(id);
    }

    public save(event: Event, id: string): Promise<Event> {
        return this.service.insertEvent(event, id);
    }

    public listCalendars(): Promise<string[]> {
        return this.service.listCalendars();
    }

}
