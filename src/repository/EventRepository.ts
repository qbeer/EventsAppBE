import { getConnection, Repository } from "typeorm";
import { Event } from "../model/Event";

export class EventRepository {

    private repository: Repository<Event> | undefined;

    constructor(private connectionType: string) {}

    public save(event: Event): Promise<Event> {
        try {
            return this.getRepository().save(event);
        } catch (dbError) {
            throw dbError;
        }
    }

    public getAll(): Promise<Event[]> {
        try {
            return this.getRepository().find({
                order: {
                    // tslint:disable-next-line:trailing-comma
                    eventDate: "DESC"
                // tslint:disable-next-line:trailing-comma
                }
            });
        } catch (dbError) {
            return dbError;
        }
    }

    private getRepository() {
        if (this.repository == null) {
            this.repository = getConnection(this.connectionType).manager.getRepository(Event);
        }
        return this.repository;
    }

}
