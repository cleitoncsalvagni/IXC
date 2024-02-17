import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";

interface AuthContext {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isAuthenticated: boolean;
  handleLogin: (data: AuthSchema) => void;
  isLoginLoading: boolean;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const { mutate, isLoading } = useMutation(
    ({ email, password }: AuthSchema) => login({ email, password }),
    { onSuccess, onError }
  );

  function onSuccess(response: GenericRequest<User>) {
    toast.dismiss();

    if (response) {
      const { error, message, user } = response;

      if (!error) {
        setUser(user);
        router.replace("/chat");
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  }

  function onError() {
    toast.dismiss();

    toast.error(
      "Não foi possível concluir a operação, tente novamente mais tarde!"
    );
  }

  const handleLogin = (data: AuthSchema) => mutate(data);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        isLoginLoading: isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
