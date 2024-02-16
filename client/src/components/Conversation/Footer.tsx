import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormInput } from "../Shared/FormInput";

const schema = Yup.object().shape({
  chatMessage: Yup.string().required(),
});

export const ConversationFooter: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSendMessage(info: { chatMessage: string }) {
    console.log(info);
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
          onClick={handleSubmit(handleSendMessage)}
          className="flex items-center justify-center gap-2 hover:scale-105 transition-transform"
        >
          <p className="font-bold">Enviar</p>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};
