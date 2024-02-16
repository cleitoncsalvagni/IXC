import { ArrowRight } from "react-feather";
import { FormInput } from "../Shared/FormInput";

export const ConversationFooter = () => {
  return (
    <div className="flex flex-col items-center bg-red-500 p-5">
      <FormInput
        multipleLines
        placeholder="Digite sua mensagem aqui"
        classNames={{
          container: "border-zinc-200 h-32 bg-white",
          input: "p-2",
        }}
      />
      <div className="flex w-full justify-end m-2">
        <button className="flex items-center justify-center gap-2 hover:scale-105 transition-transform">
          <p className="font-bold">Enviar</p>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
