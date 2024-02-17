import cors from "cors";
import express, { Request, Response, json } from "express";
import mongoose from "mongoose";
import { Login } from "./routes/Login.routes";
import { Register } from "./routes/Register.routes";
require("dotenv").config();

const port = process.env.PORT || 3003;
const dbUri = process.env.MONGO_DB_URI;

const app = express();
app.use(json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).send("Working");
});
app.post("/v1/register", Register);
app.post("/v1/login", Login);

app.listen(port as number, "0.0.0.0", () => {
  console.log(`Server running on port: ${port}`);
});

mongoose
  .connect(dbUri as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error.message);
  });
