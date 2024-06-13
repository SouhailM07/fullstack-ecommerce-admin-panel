import { Router } from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../controllers/user.controllers";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getOneUser);
router.post("/create", createUser);
router.put("/edit/:id", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
