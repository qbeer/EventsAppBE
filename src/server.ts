import bodyParser from "body-parser";
import express from "express";
import { OAuth2Client } from "google-auth-library";
import { PORT } from "../config";
import { setUpRouter } from "./router";
import { CalendarAuthService } from "./service/CalendarAuthService";

export const app: express.Application = express();
const port: string | number = PORT;

const authService = new CalendarAuthService();

authService.authorizedClient().then((client: OAuth2Client) => {

    app.use(bodyParser.json());

    app.use(setUpRouter(client));

    app.listen(port, () => {
        console.log(`Events App backend listening on port: ${port}`);
    });

}).catch(() => {

    console.log("Authentication failed.");

});
