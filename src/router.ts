import { Request, Response, Router } from "express";
import { OAuth2Client } from "google-auth-library";
import { ERROR_CODE, REQUEST_SUCCESS } from "../config";
import { EventController } from "./controllers/EventController";
import { ControllerFactory } from "./factory/ControllerFactory";
import { Event } from "./model/Event";


export function setUpRouter(client: OAuth2Client): Router {

    const appRouter: Router = Router();
    const eventController: EventController = ControllerFactory.getInstance(client);

    appRouter.post("/save", (req: Request, res: Response) => {
        const event: Event = {
            eventDescription: req.body.eventDescription,
            eventHost: req.body.eventHost,
            eventLocation: req.body.eventLocation,
            maxParticipants: req.body.maxParticipants ? req.body.maxParticipants : undefined };
        eventController.save(event).then((savedEvent) => {
            res.send(savedEvent).status(REQUEST_SUCCESS);
        }).catch(() => {
            res.send("ERROR").status(ERROR_CODE);
        });
    });

    appRouter.get("/all", (req: Request, res: Response) => {
        eventController.getAll().then((events) => {
            res.send(events).status(REQUEST_SUCCESS);
        }).catch(() => {
            res.send("ERROR").status(ERROR_CODE);
        });
    });

    return appRouter;

}
