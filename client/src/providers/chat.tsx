import { GET_ALL_USERS, GET_CHATS } from "@/constants/queryKeys";
import { createChat, getUserChat } from "@/services/chat";
import { getAllUsers } from "@/services/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useAuth } from "./auth";

interface ChatContext {
  userChat: Chat[] | undefined;
  isLoadingChats: boolean;
  setUserChat: (chat: any) => void;
  potentialChats: PotentialChat[] | undefined;
  handleCreateChat: (data: ChatID) => void;
}

interface ChatID {
  firstId: string;
  secondId: string;
}

const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userChat, setUserChat] = useState<Chat[] | undefined>();
  const [potentialChats, setPotentialChats] = useState<
    PotentialChat[] | undefined
  >([]);

  const { mutate } = useMutation((data: ChatID) => createChat(data), {
    onSuccess,
    onError,
  });

  function onSuccess(response: GenericRequest<Chat>) {
    if (response) {
      const { error } = response;

      if (!error) {
        setUserChat((prev: any) => {
          return [...(prev || []), response.chat];
        });
      }
    }
  }

  function onError() {
    toast.error("Verifique sua conexão com a internet e tente novamente.");
  }

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

  function handleCreateChat({ firstId, secondId }: ChatID) {
    mutate({ firstId, secondId });
  }

  return (
    <ChatContext.Provider
      value={{
        userChat,
        potentialChats,
        handleCreateChat,
        isLoadingChats: isFetching,
        setUserChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
