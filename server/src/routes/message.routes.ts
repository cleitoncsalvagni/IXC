import express from "express";
import { createMessage, getMessages } from "../controllers/message";

const router = express.Router();

router.post("/", createMessage);
router.get("/:chatId", getMessages);

export { router as MessageRoutes };
