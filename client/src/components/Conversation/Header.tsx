import Image from "next/image";

export const ConversationHeader = () => {
  return (
    <div className="p-5 py-3 flex items-center ">
      <Image
        src="/img/avatar2.jpg"
        alt="User"
        width={100}
        height={100}
        className="h-14 w-14 rounded-full object-cover"
      />

      <div className="ml-4">
        <h1 className="font-medium">Ana da Silva</h1>

        <div className="flex items-center mt-1 gap-1">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
          <div className="text-zinc-400 text-sm">Online</div>
        </div>
      </div>
    </div>
  );
};
