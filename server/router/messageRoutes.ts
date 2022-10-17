import { Router } from "express";
import {  getAllUserMail, sendMessage, getMailbyId } from "../controllers/message";

const router = Router();

router.post("/send", sendMessage);
router.get("/all/:username", getAllUserMail);
router.get("/:id", getMailbyId);

export { router as messageRoutes };
