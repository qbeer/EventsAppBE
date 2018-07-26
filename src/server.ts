import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

createConnection().then(() => {

    console.log("Connection to DB established.");
    app.listen(port, () => {
        console.log(`Events App backend listening on port: ${port}`);
    });

}).catch((error) => {

    console.log(error);

});
