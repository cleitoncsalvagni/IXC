import { useFetchRecipientUser } from "@/hooks/useFetchRecipientUser";
import { useChat } from "@/providers/chat";
import { Avatar } from "@nextui-org/react";

export const ConversationHeader: React.FC = () => {
  const { currentChat, onlineUsers } = useChat();
  const { recipientUser } = useFetchRecipientUser(currentChat);

  const isUserOnline = onlineUsers?.find(
    (user) => user.userId === recipientUser?.id
  );

  return (
    <div className="p-5 py-3 flex items-center ">
      <Avatar name={recipientUser?.name || ""} size="lg" />

      <div className="ml-4">
        <h1 className="font-medium">{recipientUser?.name}</h1>

        <div className="flex items-center mt-1 gap-1">
          <div
            className={`w-2.5 h-2.5  rounded-full ${
              isUserOnline ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          <div className="text-zinc-400 text-sm">
            {isUserOnline ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
};
