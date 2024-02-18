import { useFetchLastMessage } from "@/hooks/useFetchLastMessage";
import { useFetchRecipientUser } from "@/hooks/useFetchRecipientUser";
import { useAuth } from "@/providers/auth";
import { useChat } from "@/providers/chat";
import { Avatar, Spinner } from "@nextui-org/react";
import { Send } from "react-feather";

const RenderChat = ({ chat }: { chat: Chat }) => {
  const { user } = useAuth();
  const { handleUpdateCurrentChat } = useChat();
  const { recipientUser } = useFetchRecipientUser(chat);
  const { latestMessage } = useFetchLastMessage(chat);
  const { currentChat } = useChat();

  const sentByMe = latestMessage?.senderId === user?.id;
  const isSelected = chat._id === currentChat?._id;

  return (
    <div
      onClick={() => handleUpdateCurrentChat(chat)}
      className={`flex items-center break-all cursor-pointer rounded-3xl p-3 px-4 ${
        isSelected ? "bg-blue-100" : "bg-zinc-100"
      } min-w-full`}
    >
      <Avatar name={recipientUser?.name || ""} size="lg" />

      <div className="flex flex-1 flex-col ml-3">
        <h1 className="line-clamp-1">{recipientUser?.name}</h1>

        {latestMessage?.text ? (
          <p
            className={`line-clamp-1 text-xs text-zinc-400 ${
              sentByMe && "italic"
            }`}
          >
            {sentByMe && "Você enviou:"} {latestMessage?.text}
          </p>
        ) : (
          <p className="text-xs text-zinc-400">
            Clique para inicar a conversa.
          </p>
        )}
      </div>
    </div>
  );
};

const RenderPotentialChats = ({
  potentialChats,
}: {
  potentialChats?: PotentialChat[];
}) => {
  const { user } = useAuth();
  const { handleCreateChat, onlineUsers } = useChat();

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-1">
        <Send size={15} className="text-primary" />
        <h1 className="text-xs font-medium text-primary">Contatos</h1>
      </div>
      <div className="flex items-center gap-2 flex-wrap my-2">
        {potentialChats && potentialChats?.length > 0 ? (
          potentialChats
            .sort((a, b) => a.name.localeCompare(b.name))
            ?.map((u, index) => (
              <div
                key={index}
                onClick={() =>
                  handleCreateChat({ firstId: user?.id!, secondId: u._id })
                }
                className="fade-in flex items-center break-all cursor-pointer border p-1 px-2 shadow-md rounded-full border-zinc-300"
              >
                <h1 className="line-clamp-1 text-xs">{u.name}</h1>

                {onlineUsers?.some((user) => user.userId === u._id) && (
                  <div className="flex w-2 h-2 rounded-full bg-green-500 ml-1" />
                )}
              </div>
            ))
        ) : (
          <p className="fade-in text-[10px] text-zinc-400">
            Não há contatos no momento.
          </p>
        )}
      </div>
    </div>
  );
};

export const ChatSidebar: React.FC = () => {
  const { userChat, isLoadingChats, potentialChats } = useChat();

  return (
    <div className="flex flex-col w-5/12 p-5 items-center gap-3 ">
      {isLoadingChats ? (
        <Spinner className="fade-in" />
      ) : (
        <>
          <RenderPotentialChats potentialChats={potentialChats} />

          {userChat && userChat?.length > 0 ? (
            userChat?.map((chat, index) => (
              <RenderChat key={index} chat={chat} />
            ))
          ) : (
            <p className="text-xs text-zinc-400 mt-10">
              Você ainda não começou nenhuma conversa. 👀
            </p>
          )}
        </>
      )}
    </div>
  );
};
