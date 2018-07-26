import express from "express";
import { MainController } from "./controllers/MainController";

const app: express.Application = express();
const port: string | number = process.env.PORT || 3000;

app.use(MainController);

app.listen(port, () => {
    console.log(`Events App backend listening on port: ${port}`);
});
