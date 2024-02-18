import { createAdapter } from "@socket.io/cluster-adapter";
import { setupWorker } from "@socket.io/sticky";
import { Express } from "express";
import { createServer } from "http";
import { Server as SocketIoServer } from "socket.io";
import { Socket } from "socket.io/dist/socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

let onlineUsers: { userId: string; socketId: string }[] = [];

export const createSocketServer = (app: Express) => {
  const httpServer = createServer(app);
  const io = new SocketIoServer(httpServer, { cors: { origin: "*" } });
  io.adapter(createAdapter());
  setupWorker(io);

  io.on("connection", (socket) => {
    addNewUser(socket, io);

    socket.on("sendMessage", (message) => {
      sendMessage(message, io);
    });

    socket.on("disconnect", () => {
      removeUser(socket, io);
    });
  });

  return io.listen(5173);
};

const getOnlineUsers = (io: SocketIoServer) => {
  io.emit("getOnlineUsers", onlineUsers);
};

const addNewUser = (socket: SocketType, io: SocketIoServer) => {
  socket.on("addNewUser", (userId: string) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    getOnlineUsers(io);
  });
};

const removeUser = (socket: SocketType, io: SocketIoServer) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

  getOnlineUsers(io);
};

const sendMessage = (message: Message, io: SocketIoServer) => {
  const user = onlineUsers.find((user) => user.userId === message.recipientId);

  if (user) {
    io.to(user.socketId).emit("getMessage", message);
    io.to(user.socketId).emit("getNotification", {
      senderId: message.senderId,
      isRead: false,
      date: new Date(),
    });
  }
};
