import { useAuth } from "@/providers/auth";
import { register } from "@/services/auth";
import { REGISTER_SCHEMA } from "@/utils/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Lock, Mail, User } from "react-feather";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { AuthHeader } from "../Shared/AuthHeader";
import { FormInput } from "../Shared/FormInput";
import { VisibilityPassSwitch } from "../Shared/VisibilityPassSwitch";

interface RegisterProps {
  setContentMode: (mode: "login" | "register") => void;
}

interface RegisterSchema {
  name: string;
  email: string;
  password: string;
}

export const Register: React.FC<RegisterProps> = ({ setContentMode }) => {
  const { handleLogin, isLoginLoading } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver<RegisterSchema>(REGISTER_SCHEMA),
  });

  const { mutate, isLoading: isRegisterLoading } = useMutation(
    ({ name, email, password }: RegisterSchema) =>
      register({
        name,
        email,
        password,
      }),
    {
      onSuccess,
      onError,
    }
  );

  function onSuccess(response: GenericRequest<User>, data: RegisterSchema) {
    if (response) {
      const { error, message, user } = response;

      if (!error) {
        const socket = io("http://localhost:5173");
        socket.emit("addNewUser", user?.id);

        handleLogin(data);
      } else {
        toast.error(message);
      }
    }
  }

  function onError() {
    toast.error(
      "Não foi possível realizar o cadastro. Tente novamente mais tarde."
    );
  }

  const handleRegister = (data: RegisterSchema) => {
    const params = {
      ...data,
      saveLogin: true,
    };

    return mutate(params);
  };

  const handleVisiblePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  return (
    <div className="fade-in flex flex-col justify-between bg shadow-xl bg-white rounded-3xl">
      <div className="p-10 px-28 pt-16">
        <AuthHeader
          title="Crie sua conta"
          subtitle="Comece a usar nossos serviços agora mesmo!"
        />

        <div className="flex flex-col my-10 gap-3">
          <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormInput
                type="text"
                label="Nome"
                value={value}
                onChange={onChange}
                placeholder="Insira seu nome"
                errorMessage={errors.name?.message}
                left={<User size={18} />}
              />
            )}
          />

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
            className="flex items-center justify-center border-1 border-black rounded-full py-1 mt-4 hover:scale-105 transition-transform min-h-9"
          >
            {isLoginLoading || isRegisterLoading ? (
              <Spinner color="current" size="sm" className="fade-in" />
            ) : (
              <p className="fade-in font-semibold">Cadastrar</p>
            )}
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
