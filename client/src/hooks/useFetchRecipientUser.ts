import { FIND_CHAT } from "@/constants/queryKeys";
import { useAuth } from "@/providers/auth";
import { findUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useFetchRecipientUser(chat: Chat) {
  const { user } = useAuth();
  const [recipientUser, setRecipientUser] = useState<User | undefined>();

  const recipientId = chat?.members.find((id) => id !== user?.id);

  const { data, isSuccess } = useQuery([FIND_CHAT, recipientId], () =>
    findUser({ recipientId })
  );

  useEffect(() => {
    if (isSuccess) {
      setRecipientUser(data?.user);
    }
  }, [isSuccess]);

  return { recipientUser };
}
