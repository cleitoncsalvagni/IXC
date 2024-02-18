import { queryConfig } from "@/config/query";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AuthProvider } from "./auth";
import { ChatProvider } from "./chat";
import { SocketProvider } from "./socket";

const queryClient = new QueryClient(queryConfig);

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <SocketProvider>
          <AuthProvider>
            <ChatProvider>{mounted ? children : null}</ChatProvider>
          </AuthProvider>
        </SocketProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};

export default Providers;
