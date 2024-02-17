import { GET_ALL_USERS, GET_CHATS } from "@/constants/queryKeys";
import { getUserChat } from "@/services/chat";
import { getAllUsers } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth";

interface ChatContext {
  userChat: Chat[] | undefined;
  isLoadingChats: boolean;
  setUserChat: (chat: any) => void;
  potentialChats: PotentialChat[] | undefined;
}

const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userChat, setUserChat] = useState<Chat[] | undefined>();
  const [potentialChats, setPotentialChats] = useState<
    PotentialChat[] | undefined
  >([]);

  const { data: potentialChatsData, isSuccess: potentialChatsSuccess } =
    useQuery([GET_ALL_USERS], () => getAllUsers());

  useEffect(() => {
    if (potentialChatsSuccess) {
      const pChats = potentialChatsData?.users?.filter((u) => {
        let isChatCreated = false;

        if (u._id === user?.id) return false;

        if (userChat) {
          isChatCreated = userChat?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    }
  }, [potentialChatsSuccess, userChat]);

  const { data, isFetching, isSuccess } = useQuery(
    [GET_CHATS, user?.id],
    () => getUserChat({ id: user!.id }),
    {
      enabled: !!user?.id,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setUserChat(data?.chats);
    }
  }, [isSuccess]);

  return (
    <ChatContext.Provider
      value={{
        userChat,
        potentialChats,
        isLoadingChats: isFetching,
        setUserChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
