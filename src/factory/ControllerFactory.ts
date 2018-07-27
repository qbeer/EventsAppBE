import { EventController } from "../controllers/EventController";
import { EventRepository } from "../repository/EventRepository";
import { EventService } from "../service/EventService";

export class ControllerFactory {

    public static getInstance(): EventController {
        return new EventController(
            new EventService(
                new EventRepository(process.env.DB || "test")));
    }

}
