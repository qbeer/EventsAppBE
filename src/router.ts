import { Request, Response, Router } from "express";
import { DB_ERROR_CODE, REQUEST_SUCCESS } from "../config";
import { EventController } from "./controllers/EventController";
import { ControllerFactory } from "./factory/ControllerFactory";
import { Event } from "./model/Event";

const appRouter: Router = Router();

const eventController: EventController = ControllerFactory.getInstance();

appRouter.post("/save", async (req: Request, res: Response) => {
    const event: Event = {
        eventDescription: req.body.eventDescription,
        eventHost: req.body.eventHost,
        eventLocation: req.body.eventLocation,
        maxParticipants: req.body.maxParticipants ? req.body.maxParticipants : undefined};
    try {
        eventController.save(event);
    } catch (endpointErr) {
        res.status(DB_ERROR_CODE);
    }
    res.status(REQUEST_SUCCESS);
});

appRouter.get("/all", async (req: Request, res: Response) => {
    await   eventController.all().then((events) => {
        console.log(events);
        res.status(REQUEST_SUCCESS).send(events);
    }).catch(() => {
        res.status(DB_ERROR_CODE);
    });
});

export const router: Router = appRouter;
