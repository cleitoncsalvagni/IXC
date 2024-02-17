import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { useAuth } from "@/providers/auth";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  const [contentMode, setContentMode] = useState<"login" | "register">("login");

  if (user) {
    router.replace("/chat");
    return null;
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      {contentMode === "login" ? (
        <Login setContentMode={setContentMode} />
      ) : (
        <Register setContentMode={setContentMode} />
      )}
    </main>
  );
}
