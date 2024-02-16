import { AUTH_SCHEMA } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import { ArrowRight, Lock, Mail } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import { AuthHeader } from "../Shared/AuthHeader";
import { FormInput } from "../Shared/FormInput";
import { VisibilityPassSwitch } from "../Shared/VisibilityPassSwitch";

interface LoginProps {
  setContentMode: (mode: "login" | "register") => void;
}

export const Login: React.FC<LoginProps> = ({ setContentMode }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [saveLogin, setSaveLogin] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<AuthSchema>(AUTH_SCHEMA),
  });

  function handleLogin(info: { email: string; password: string }) {
    const params = {
      email: info.email,
      password: info.password,
      mustSaveLogin: saveLogin ? 1 : 0,
    };

    console.log(params);
  }

  const handleVisiblePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="fadeIn flex flex-col justify-between bg shadow-xl bg-white rounded-3xl min-w-96">
      <div className="p-10 px-28 pt-16">
        <AuthHeader
          title="Acesse sua conta"
          subtitle="Insira suas credenciais para fazer login"
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

          <Checkbox
            isSelected={saveLogin}
            onValueChange={setSaveLogin}
            className="my-1"
          >
            Continuar conectado
          </Checkbox>

          <button
            onClick={handleSubmit(handleLogin)}
            className="group flex items-center justify-center gap-3 border-1 border-black rounded-full py-1 mt-2 hover:scale-105 transition-transform"
          >
            <p className="font-semibold">Acessar</p>
            <div className="flex group transition-transform transform group-hover:translate-x-2">
              <ArrowRight size={18} />
            </div>
          </button>
        </div>
      </div>

      <div
        onClick={() => setContentMode("register")}
        className="flex cursor-pointer items-center justify-center bg-zinc-100 hover:bg-zinc-200 transition-colors p-5 rounded-b-3xl"
      >
        <p className="font-semibold">Cadastrar uma nova conta</p>
      </div>
    </div>
  );
};
