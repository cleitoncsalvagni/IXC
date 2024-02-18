import { useAuth } from "@/providers/auth";
import { useChat } from "@/providers/chat";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from "../Shared/FormInput";

const schema = Yup.object().shape({
  chatMessage: Yup.string().required(),
});

export const ConversationFooter: React.FC = () => {
  const { user } = useAuth();
  const { handleSendMessage, currentChat } = useChat();

  const { control, handleSubmit, resetField, formState } = useForm({
    resolver: yupResolver(schema),
  });

  function sendMessage(info: { chatMessage: string }) {
    handleSendMessage({
      chatId: currentChat?._id,
      senderId: user?.id,
      text: info.chatMessage,
      resetField: () => resetField("chatMessage"),
    });
  }

  return (
    <div className="flex flex-col items-center bg-zinc-100 p-5">
      <Controller
        name="chatMessage"
        defaultValue=""
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormInput
            multipleLines
            value={value}
            onChange={onChange}
            placeholder="Digite sua mensagem aqui"
            classNames={{
              container: "border-zinc-200 h-32 bg-white",
              input: "p-2",
            }}
          />
        )}
      />

      <div className="flex w-full justify-end m-2">
        <button
          onClick={handleSubmit(sendMessage)}
          className="flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          <p className="font-bold">Enviar</p>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
