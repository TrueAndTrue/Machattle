import { Router } from "express";
import {  getAllUserMail, sendMessage } from "../controllers/message";

const router = Router();

router.post("/send", sendMessage);
router.get("/message/:id", getAllUserMail);
router.get("/:id", getAllUserMail);

export { router as messageRoutes };
