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
        const reqEvent: Event = {
            date: req.body.date,
            description: req.body.description,
            host: req.body.host,
            location: req.body.location,
            maxParticipants: req.body.maxParticipants ? req.body.maxParticipants : undefined,
            title: req.body.title,
        };
        eventController.save(reqEvent).then((savedEvent) => {
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
