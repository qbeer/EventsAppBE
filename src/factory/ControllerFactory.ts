import { OAuth2Client } from "google-auth-library";
import { EventController } from "../controllers/EventController";
import { CalendarService } from "../service/CalendarService";
import { EventService } from "../service/EventService";

export class ControllerFactory {

    public static getInstance(client: OAuth2Client): EventController {
        return new EventController(
            new EventService(new CalendarService(client)));
    }
}
