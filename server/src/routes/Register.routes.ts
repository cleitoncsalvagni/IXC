import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import { createJwtToken } from "../utils/createJwtToken";
require("dotenv").config();

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(200).json({
        error: true,
        message: "Por favor, preencha todos os campos obrigatórios!",
      });
    }

    let user = await UserModel.findOne({ email });

    if (user) {
      return res
        .status(200)
        .json({ error: true, message: "Este email já possui um cadastro!" });
    }

    user = new UserModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = createJwtToken(user.id);

    res.status(200).json({
      error: false,
      message: "Cadastrado com sucesso!",
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
