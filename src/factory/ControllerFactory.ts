import { EventController } from "../controllers/EventController";
import { EventRepository } from "../repository/EventRepository";
import { CalendarService } from "../service/CalendarService";
import { EventService } from "../service/EventService";

export class ControllerFactory {

    public static getInstance(): EventController {
        return new EventController(
            new EventService(
                new EventRepository(process.env.DB || "test"), new CalendarService()));
    }

}
