import { useAuth } from "@/providers/auth";
import { useChat } from "@/providers/chat";
import { useEffect } from "react";
import { Send } from "react-feather";
import { ConversationFooter } from "../Conversation/Footer";
import { ConversationHeader } from "../Conversation/Header";

export const ChatConversation: React.FC = () => {
  const { user } = useAuth();
  const { messages, currentChat } = useChat();

  useEffect(() => {
    const conversation = document.getElementById("conversations");
    conversation?.scrollTo(0, conversation.scrollHeight);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {currentChat ? (
        <>
          <ConversationHeader />

          <div
            id="conversations"
            className="flex flex-col overflow-y-scroll bg-zinc-100 h-[50vh]"
          >
            {messages && messages.length > 0 ? (
              messages?.map((item, index) => {
                const sendBySelf = item.senderId === user?.id;

                return (
                  <div
                    key={index}
                    className="w-full px-5 flex flex-col justify-between"
                  >
                    <div className="flex flex-col mt-5">
                      <div
                        className={`flex mb-2 ${
                          sendBySelf ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex flex-col mr-2 py-3 px-4 text-white ${
                            sendBySelf
                              ? "mr-2 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl"
                              : "ml-2 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl"
                          }`}
                        >
                          <p>{item.text}</p>
                          <span className="text-[11px] self-end mt-2 text-zinc-200">
                            {item.createdAt}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-zinc-300">Nenhuma mensagem ainda. 💤</p>
              </div>
            )}
          </div>

          <ConversationFooter />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3 h-[80vh]">
          <Send size={50} className="text-zinc-300" />
          <p className="text-zinc-300">
            Selecione um chat para iniciar a conversa
          </p>
        </div>
      )}
    </div>
  );
};
