import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import { AuthRoutes } from "./routes/Auth.routes";
import { ChatRoutes } from "./routes/Chat.routes";
import { MessageRoutes } from "./routes/message.routes";
import { connectToDatabase } from "./utils/db";

dotenv.config();

const port = process.env.PORT || 3003;

const dbUri = process.env.MONGO_DB_URI;
connectToDatabase(dbUri as string);

const app = express();
app.use(json());
app.use(cors());

app.use("/v1", AuthRoutes);
app.use("/v1/chat", ChatRoutes);
app.use("/v1/message", MessageRoutes);

app.listen(port as number, "0.0.0.0", () => {
  console.log(`Server running on port: ${port}`);
});
