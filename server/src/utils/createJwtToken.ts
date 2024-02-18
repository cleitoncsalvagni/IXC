import jwt from "jsonwebtoken";
require("dotenv").config();

export const createJwtToken = (id: string) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ id }, jwtkey as string, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
