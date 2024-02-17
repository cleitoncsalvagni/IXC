import { useFetchRecipientUser } from "@/hooks/useFetchRecipientUser";
import { useAuth } from "@/providers/auth";
import { useChat } from "@/providers/chat";
import { Spinner } from "@nextui-org/react";
import Image from "next/image";
import { Send } from "react-feather";

const RenderChat = ({ chat }: { chat: Chat }) => {
  const { recipientUser } = useFetchRecipientUser(chat);

  const sentByMe = false;
  const isSelected = false;
  const message = "";

  return (
    <div
      className={`flex items-center break-all cursor-pointer rounded-3xl p-3 px-4 ${
        isSelected ? "bg-blue-100" : "bg-zinc-100"
      } min-w-full`}
    >
      <Image
        src="/img/avatar2.jpg"
        alt="User"
        width={100}
        height={100}
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="flex flex-1 flex-col ml-3">
        <h1 className="line-clamp-1">{recipientUser?.name}</h1>
        <p
          className={`line-clamp-1 text-xs text-zinc-400 ${
            sentByMe && "italic"
          }`}
        >
          {sentByMe && "Você enviou:"} {message}
        </p>
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
  const { handleCreateChat } = useChat();

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center gap-1">
        <Send size={15} className="text-primary" />
        <h1 className="text-xs font-medium text-primary">
          Contatos disponíveis
        </h1>
      </div>
      <div className="flex items-center gap-2 flex-wrap my-2">
        {potentialChats && potentialChats?.length > 0 ? (
          potentialChats
            .sort((a, b) => a.name.localeCompare(b.name))
            ?.map((chat, index) => (
              <div
                key={index}
                onClick={() =>
                  handleCreateChat({ firstId: user?.id!, secondId: chat._id })
                }
                className="flex items-center break-all cursor-pointer border p-1 px-2 shadow-md rounded-full border-zinc-300"
              >
                <h1 className="line-clamp-1 text-xs">{chat.name}</h1>
              </div>
            ))
        ) : (
          <p className="text-[10px] text-zinc-400">
            Já possui conversa com todos os usuários.
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
        <Spinner />
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
