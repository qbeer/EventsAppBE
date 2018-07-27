import { Event } from "../model/Event";
import { EventRepository } from "../repository/EventRepository";

export class EventService {

    constructor(private repository: EventRepository) {}

    public getAll() {
        return this.repository.getAll();
    }

    public save(event: Event) {
        return this.repository.save(event);
    }

}
