import { Router } from "express";
import {  getAllUserMail, sendMessage, getMailbyId, setAsRead, deleteMessage } from "../controllers/message";

const router = Router();
router.put("/read", setAsRead)
router.post("/send", sendMessage);
router.delete("/delete", deleteMessage);
router.get("/all/:username", getAllUserMail);
router.get("/:id", getMailbyId);

export { router as messageRoutes };
