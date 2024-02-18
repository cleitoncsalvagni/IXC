import { GET_LATEST_MESSAGE } from "@/constants/queryKeys";
import { useChat } from "@/providers/chat";
import { getMessages } from "@/services/message";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useFetchLastMessage(chat: Chat) {
  const { newMessages } = useChat();
  const [latestMessage, setLatestMessage] = useState<Message | undefined>();

  const { data, isSuccess } = useQuery(
    [GET_LATEST_MESSAGE, chat._id, newMessages],
    () => getMessages(chat._id)
  );

  useEffect(() => {
    if (isSuccess) {
      setLatestMessage(data?.result?.[data?.result?.length - 1]);
    }
  }, [isSuccess, newMessages]);

  return { latestMessage };
}
