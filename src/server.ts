import bodyParser from "body-parser";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { CONNECTION_TYPE, PORT } from "../config";
import { router } from "./router";

export const app: express.Application = express();
const port: string | number = PORT;
const connectionType: string = CONNECTION_TYPE;

createConnection(connectionType).then(() => {

    app.use(bodyParser.json());

    app.use(router);

    console.log("Connection to DB established.");
    app.listen(port, () => {
        console.log(`Events App backend listening on port: ${port}`);
    });

}).catch((error) => {

    console.log(error);

});
