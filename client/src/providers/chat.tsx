import { GET_ALL_USERS, GET_CHATS, GET_MESSAGES } from "@/constants/queryKeys";
import { createChat, getUserChat } from "@/services/chat";
import { getMessages } from "@/services/message";
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
  handleUpdateCurrentChat: (chat: Chat) => void;
  messages: Message[] | undefined;
  isLoadingMessages: boolean;
  currentChat: Chat | undefined;
}

interface ChatID {
  firstId: string;
  secondId: string;
}

const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userChat, setUserChat] = useState<Chat[] | undefined>();
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();
  const [messages, setMessages] = useState<Message[] | undefined>([]);
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

  const {
    data: getUserChatData,
    isSuccess: isGetUserChatSuccess,
    isFetching: isGetUserChatFetching,
  } = useQuery([GET_CHATS, user?.id], () => getUserChat({ id: user!.id }), {
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (isGetUserChatSuccess) {
      setUserChat(getUserChatData?.chats);
    }
  }, [isGetUserChatSuccess]);

  const {
    data: getMessagesData,
    isSuccess: getMessagesSuccess,
    isFetching: isGetMessagesFetching,
  } = useQuery(
    [GET_MESSAGES, currentChat?._id],
    () => getMessages(currentChat?._id),
    {
      enabled: !!currentChat?._id,
    }
  );

  useEffect(() => {
    if (getMessagesSuccess) {
      setMessages(getMessagesData?.result);
    }
  }, [getMessagesSuccess, getMessagesData, currentChat?._id]);

  function handleCreateChat({ firstId, secondId }: ChatID) {
    mutate({ firstId, secondId });
  }

  function handleUpdateCurrentChat(chat: Chat) {
    setCurrentChat(chat);
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        userChat,
        currentChat,
        setUserChat,
        potentialChats,
        handleCreateChat,
        handleUpdateCurrentChat,
        isLoadingChats: isGetUserChatFetching,
        isLoadingMessages: isGetMessagesFetching,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
