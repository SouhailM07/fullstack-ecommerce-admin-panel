import { Router, Request, Response } from "express";
import Admin from "../models/admin.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const admins = await Admin.find({});
  res.status(200).send(admins);
});

export default router;
