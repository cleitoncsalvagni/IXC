import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io } from "socket.io-client";
import { useAuth } from "./auth";

interface SocketContext {
  socket: any;
}

const SocketContext = createContext<SocketContext>({} as SocketContext);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5173");
    setSocket(newSocket);

    return () => {
      newSocket?.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
