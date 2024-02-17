import { mockConversation } from "@/mocks/chat";
import { useEffect } from "react";
import { ConversationFooter } from "../Conversation/Footer";
import { ConversationHeader } from "../Conversation/Header";

export const ChatConversation: React.FC = () => {
  useEffect(() => {
    const conversation = document.getElementById("conversations");
    conversation?.scrollTo(0, conversation.scrollHeight);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <ConversationHeader />

      <div
        id="conversations"
        className="flex flex-col overflow-y-scroll bg-zinc-100 h-[50vh]"
      >
        {mockConversation.map((item, index) => {
          const sendBySelf = item.sender_id === 1;

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
                    <p>{item.message}</p>
                    <span className="text-[11px] self-end mt-2 text-zinc-200">
                      {item.date}, {item.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ConversationFooter />
    </div>
  );
};
