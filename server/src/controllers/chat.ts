import dotenv from "dotenv";
import { Request, Response } from "express";
import { chatModel } from "../models/ChatModel";

dotenv.config();

const createChat = async (req: Request, res: Response) => {
  try {
    const { firstId, secondId } = req.body;

    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) {
      return res.status(200).json({ error: false, chat });
    }

    const newChat = new chatModel({
      members: [firstId, secondId],
    });

    const response = await newChat.save();

    res.status(200).json({ error: false, chat: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const findChat = async (req: Request, res: Response) => {
  try {
    const { firstId, secondId } = req.params;

    const chat = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json({ error: false, chat });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const findUserChats = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const chats = await chatModel.find({ members: { $in: [userId] } });

    res.status(200).json({ error: false, chats });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { createChat, findChat, findUserChats };
