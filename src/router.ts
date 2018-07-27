import { Request, Response, Router } from "express";
import { EventController } from "./controllers/EventController";
import { ControllerFactory } from "./factory/ControllerFactory";

const appRouter: Router = Router();

const eventController: EventController = ControllerFactory.getInstance();

appRouter.post("/save", async (req: Request, res: Response) => {
    const { event } = req.body;
    try {
        eventController.save(event);
    } catch (endpointErr) {
        res.status(505);
    }
    res.status(400);
});

appRouter.get("/all", async (req: Request, res: Response) => {
    try {
        const events = await eventController.all();
        res.status(400).send(events);
    } catch (err) {
        res.status(505);
    }
});

export const router: Router = appRouter;
