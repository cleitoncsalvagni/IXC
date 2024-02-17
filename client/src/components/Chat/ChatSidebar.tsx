import Image from "next/image";

const RenderChat = ({
  isSelected,
  sentByMe,
  message,
}: {
  message: string;
  isSelected?: boolean;
  sentByMe?: boolean;
}) => {
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
        <h1 className="line-clamp-1">Ana da Silva</h1>
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

export const ChatSidebar: React.FC = () => {
  return (
    <div className="flex flex-col w-5/12  p-5 items-center gap-3">
      <RenderChat
        isSelected
        sentByMe
        message="Sim estou fazendo aquelas atividades pendentes"
      />
      <RenderChat message="Vou verificar e já te aviso" />
    </div>
  );
};
