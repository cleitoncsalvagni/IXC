import { ChatConversation } from "@/components/Chat/ChatConversation";
import { ChatHeader } from "@/components/Chat/ChatHeader";
import { ChatSidebar } from "@/components/Chat/ChatSidebar";
import { AuthenticationRequired } from "@/components/Shared/AuthenticationRequired";
import { useAuth } from "@/providers/auth";
import { Spinner } from "@nextui-org/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const Chat: React.FC = () => {
  const { isAuthenticated, isLoginLoading } = useAuth();

  if (!isAuthenticated && !isLoginLoading) {
    return <AuthenticationRequired />;
  }

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      {isLoginLoading ? (
        <Spinner size="lg" className="fade-in" />
      ) : (
        <div className="fade-in flex flex-col bg-white w-8/12 rounded-2xl shadow-xl divide-y-1 divide-zinc-100 min-h-[50vh]">
          <ChatHeader />

          <div className="flex h-full divide-x-1 divide-zinc-100">
            <ChatSidebar />

            <ChatConversation />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
