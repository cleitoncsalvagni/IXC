import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { createJwtToken } from "../utils/createJwtToken";
require("dotenv").config();

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(200).json({
        error: true,
        message: "Por favor, preencha todos os campos obrigatórios!",
      });
    }

    let user = await UserModel.findOne({ email });

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
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
};
