import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [contentMode, setContentMode] = useState<"login" | "register">("login");

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
