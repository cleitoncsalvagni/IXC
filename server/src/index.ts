import { setupPrimary } from "@socket.io/cluster-adapter";
import { setupMaster } from "@socket.io/sticky";
import cluster from "cluster";
import cors from "cors";
import dotenv from "dotenv";
import express, { json } from "express";
import http from "http";
import os from "os";
import { AuthRoutes } from "./routes/auth.routes";
import { ChatRoutes } from "./routes/chat.routes";
import { MessageRoutes } from "./routes/message.routes";
import { createSocketServer } from "./services/socket";
import { connectToDatabase } from "./utils/db";

dotenv.config();

if (!process.env.MONGO_DB_URI)
  throw new Error("MONGO_DB_URI is not defined in .env file");

const port = process.env.PORT || 3003;

const numCPUs = os.cpus().length;
const isClusterPrimary = cluster.isPrimary;

if (isClusterPrimary) {
  const httpServer = http.createServer();

  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection",
  });

  setupPrimary();

  httpServer.listen(port, () => {
    console.log(`Primary process is running on port: ${port}`);
  });

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", () => {
    cluster.fork();
  });
} else {
  const app = express();
  const dbUri = process.env.MONGO_DB_URI;

  createSocketServer(app);
  connectToDatabase(dbUri as string);

  app.use(json());
  app.use(cors());

  app.use("/v1", AuthRoutes);
  app.use("/v1/chat", ChatRoutes);
  app.use("/v1/message", MessageRoutes);

  app.listen(port as number, "0.0.0.0", () => {
    console.log(`Worker process ${process.pid} is running on port: ${port}`);
  });
}
