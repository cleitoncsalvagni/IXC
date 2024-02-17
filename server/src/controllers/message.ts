import { Request, Response } from "express";
import { messageModel } from "../models/messageModel";

const createMessage = async (req: Request, res: Response) => {
  try {
    const { chatId, senderId, text } = req.body;

    const message = new messageModel({
      chatId,
      senderId,
      text,
    });

    const response = await message.save();

    res.status(200).json({ error: false, message: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getMessages = async (req: Request, res: Response) => {
  try {
    const { chatId } = req.params;

    const response = await messageModel.find({ chatId });

    res.status(200).json({ error: false, message: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export { createMessage, getMessages };
