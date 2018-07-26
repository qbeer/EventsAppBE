import { Repository } from "typeorm";
import { Event } from "../model/Event";

export class EventRepository {

    constructor(private repository: Repository<Event>) {}

    public async saveEvent(event: Event): Promise<void> {
        try {
            await this.repository.create(event);
        } catch (dbError) {
            throw dbError;
        }
    }

    public async getAll(): Promise<Event[]> {
        try {
            return this.repository.find();
        } catch (dbError) {
            return dbError;
        }
    }

}
