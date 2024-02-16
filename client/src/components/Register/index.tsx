import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Lock, Mail } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { AuthHeader } from "../Shared/AuthHeader";
import { FormInput } from "../Shared/FormInput";
import { VisibilityPassSwitch } from "../Shared/VisibilityPassSwitch";

interface RegisterProps {
  setContentMode: (mode: "login" | "register") => void;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("E-mail precisa ser preenchido"),
  password: Yup.string()
    .min(8, "A senha precisa conter no minímo 8 caracteres")
    .required("Senha precisa ser preenchida"),
});

export const Register: React.FC<RegisterProps> = ({ setContentMode }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<AuthSchema>(schema),
  });

  function handleRegister(info: { email: string; password: string }) {
    console.log(info);
  }

  const handleVisiblePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="fadeIn flex flex-col justify-between bg shadow-xl bg-white rounded-3xl">
      <div className="p-10 px-28 pt-16">
        <AuthHeader
          title="Crie sua conta"
          subtitle="Comece a usar nossos serviços agora mesmo!"
        />

        <div className="flex flex-col my-10 gap-2">
          <Controller
            name="email"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInput
                type="email"
                label="E-mail"
                value={value}
                onChange={onChange}
                placeholder="Insira seu e-mail"
                errorMessage={errors.email?.message}
                left={<Mail size={18} />}
              />
            )}
          />

          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInput
                value={value}
                onChange={onChange}
                label="Senha"
                type={passwordVisible ? "text" : "password"}
                placeholder="Insira sua senha"
                errorMessage={errors.password?.message}
                left={<Lock size={18} />}
                right={
                  <VisibilityPassSwitch
                    visible={passwordVisible}
                    handler={handleVisiblePassword}
                  />
                }
              />
            )}
          />

          <button
            onClick={handleSubmit(handleRegister)}
            className="flex items-center justify-center border-1 border-black rounded-full py-1 mt-4 hover:scale-105 transition-transform"
          >
            <p className="font-semibold">Cadastrar</p>
          </button>
        </div>
      </div>

      <div
        onClick={() => setContentMode("login")}
        className="flex cursor-pointer items-center justify-center bg-zinc-100 hover:bg-zinc-200 transition-colors p-5 rounded-b-3xl"
      >
        <p className="font-semibold">Já possuo uma conta</p>
      </div>
    </div>
  );
};
