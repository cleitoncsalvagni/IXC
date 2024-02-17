import { useAuth } from "@/providers/auth";
import Image from "next/image";

export const ChatHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex items-center justify-between p-5 py-3 shadow">
      <div>
        <h1 className="font-semibold text-lg">Mensagens</h1>
      </div>

      <div className="flex items-center">
        <div className="flex flex-col items-end">
          <p className="font-medium">{user?.name}</p>
          <p className="text-sm text-zinc-400">{user?.email}</p>
        </div>

        <Image
          alt="User"
          src="/img/avatar.jpg"
          width={50}
          height={50}
          className="rounded-full ml-5 object-cover"
        />
      </div>
    </div>
  );
};
