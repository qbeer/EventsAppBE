import { Request, Response, Router } from "express";
import { pool } from "../repository/EventRepository";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("This my the MakeEvents App");
});

router.get("/db", async (req: Request, res: Response) => {
    try {
      const client = await pool.connect();
      const result = await client.query("SELECT * FROM test_table");
      res.render("pages/db", result);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  });

export const MainController: Router = router;
