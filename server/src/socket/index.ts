import { Server } from "socket.io";
import { Socket } from "socket.io/dist/socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type SocketType = Socket<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
>;

const io = new Server({
  cors: {
    origin: "http://127.0.0.1:3000",
  },
});

let onlineUsers: { userId: string; socketId: string }[] = [];

const getOnlineUsers = () => {
  io.emit("getOnlineUsers", onlineUsers);
};

const addNewUser = (socket: SocketType) => {
  socket.on("addNewUser", (userId: string) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });

    getOnlineUsers();
  });
};

const removeUser = (socket: SocketType) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

  getOnlineUsers();
};

const sendMessage = (message: Message) => {
  const user = onlineUsers.find((user) => user.userId === message.recipientId);

  if (user) {
    io.to(user.socketId).emit("getMessage", message);
  }
};

export const createSocketServer = () => {
  io.on("connection", (socket) => {
    addNewUser(socket);

    socket.on("sendMessage", (message) => {
      sendMessage(message);
    });

    socket.on("disconnect", () => {
      removeUser(socket);
    });
  });

  return io.listen(5173);
};
