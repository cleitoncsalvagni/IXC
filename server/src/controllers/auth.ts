import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { userModel } from "../models/userModel";
import { createJwtToken } from "../utils/createJwtToken";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        error: true,
        message: "Por favor, preencha todos os campos obrigatórios!",
      });
    }

    let user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ error: true, message: "Usuário não encontrado!" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res
        .status(200)
        .json({ error: true, message: "Usuário ou senha inválidos!" });
    }

    const token = createJwtToken(user.id);

    res.status(200).json({
      error: false,
      message: "Seja bem-vindo(a)! :)",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(200).json({
        error: true,
        message: "Por favor, preencha todos os campos obrigatórios!",
      });
    }

    let user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(200)
        .json({ error: true, message: "Este email já possui um cadastro!" });
    }

    user = new userModel({ name, email, password, image: "" });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(200).json({
      error: false,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      error: false,
      users,
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

const findUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(200).json({
        error: true,
        message: "Usuário não encontrado!",
      });
    }

    res.status(200).json({
      error: false,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};

export { findAllUsers, findUser, login, register };
