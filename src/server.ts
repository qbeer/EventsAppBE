import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { router } from "./router";

export const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;
const connectionType: string = process.env.DB || "test";

createConnection(connectionType).then(() => {

    app.use(router);

    console.log("Connection to DB established.");
    app.listen(port, () => {
        console.log(`Events App backend listening on port: ${port}`);
    });

}).catch((error) => {

    console.log(error);

});
