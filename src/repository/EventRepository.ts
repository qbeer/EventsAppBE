import { getConnection, Repository } from "typeorm";
import { Event } from "../model/Event";

export class EventRepository {

    private repository: Repository<Event>;

    constructor() {
        this.repository = getConnection(process.env.DB || "test").manager.getRepository(Event);
    }

    public async saveEvent(event: Event): Promise<void> {
        try {
            await this.repository.save(event);
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
