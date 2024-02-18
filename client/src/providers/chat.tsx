import { GET_ALL_USERS, GET_CHATS, GET_MESSAGES } from "@/constants/queryKeys";
import { createChat, getUserChat } from "@/services/chat";
import { createMessage, getMessages } from "@/services/message";
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
import { io } from "socket.io-client";
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
  handleSendMessage: (data: CreateMessage) => void;
  onlineUsers: OnlineUser[];
  setCurrentChat: (chat: Chat | undefined) => void;
  allUsers: PotentialChat[] | undefined;
  newMessages: Message | undefined;
}

interface OnlineUser {
  userId: string;
  socketId: string;
}

interface ChatID {
  firstId: string;
  secondId: string;
}

interface CreateMessage {
  chatId: string | undefined;
  senderId: string | undefined;
  text: string;
  resetField: () => void;
}

const ChatContext = createContext<ChatContext>({} as ChatContext);

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [userChat, setUserChat] = useState<Chat[] | undefined>();
  const [currentChat, setCurrentChat] = useState<Chat | undefined>();
  const [messages, setMessages] = useState<Message[] | undefined>([]);
  const [newMessages, setNewMessages] = useState<Message | undefined>();
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [socket, setSocket] = useState<any>();
  const [allUsers, setAllUsers] = useState<PotentialChat[] | undefined>([]);
  const [potentialChats, setPotentialChats] = useState<
    PotentialChat[] | undefined
  >([]);

  useEffect(() => {
    const newSocket = io("http://127.0.0.1:5173");
    setSocket(newSocket);

    return () => {
      newSocket?.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket && user) {
      socket.emit("addNewUser", user?.id);
      socket.on("getOnlineUsers", (users: OnlineUser[]) => {
        setOnlineUsers(users);
      });
    }

    return () => {
      socket?.off("getOnlineUsers");
    };
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      const recipientId = currentChat?.members.find((id) => id !== user?.id);

      socket.emit("sendMessage", { ...newMessages, recipientId });
    }
  }, [newMessages, currentChat]);

  useEffect(() => {
    if (socket) {
      socket.on("getMessage", (message: Message) => {
        if (currentChat?._id === message.chatId) {
          setMessages((prev: any) => [...(prev || []), message]);
        }
      });
    }

    return () => {
      socket?.off("getMessage");
    };
  }, [socket, currentChat, user]);

  const { mutate: createChatMutation } = useMutation(
    (data: ChatID) => createChat(data),
    {
      onSuccess: onCreateChatSuccess,
      onError,
    }
  );

  function onCreateChatSuccess(response: GenericRequest<Chat>) {
    if (response) {
      const { error } = response;

      if (!error) {
        setUserChat((prev: any) => {
          return [...(prev || []), response.chat];
        });
      }
    }
  }

  const { mutate: createMessageMutation } = useMutation(
    (data: CreateMessage) => createMessage(data),
    {
      onSuccess: onCreateMessageSuccess,
      onError,
    }
  );

  function onCreateMessageSuccess(
    response: GenericRequest<Message>,
    data: CreateMessage
  ) {
    if (response) {
      const { error } = response;

      if (!error) {
        setNewMessages(response.result);
        setMessages((prev: any) => [...(prev || []), response.result]);
        data.resetField();
      }
    }
  }

  function onError() {
    toast.error("Verifique sua conexão com a internet e tente novamente.");
  }

  const { data: potentialChatsData, isSuccess: potentialChatsSuccess } =
    useQuery([GET_ALL_USERS, user?.id], () => getAllUsers());

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
      setAllUsers(potentialChatsData?.users);
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

  function handleSendMessage({
    chatId,
    senderId,
    text,
    resetField,
  }: CreateMessage) {
    createMessageMutation({
      chatId,
      senderId,
      text,
      resetField,
    });
  }

  function handleCreateChat({ firstId, secondId }: ChatID) {
    createChatMutation({ firstId, secondId });
  }

  function handleUpdateCurrentChat(chat: Chat) {
    setCurrentChat(chat);
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        userChat,
        allUsers,
        newMessages,
        currentChat,
        setUserChat,
        onlineUsers,
        setCurrentChat,
        potentialChats,
        handleCreateChat,
        handleSendMessage,
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
