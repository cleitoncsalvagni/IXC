import { login } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface AuthContext {
  user: User | undefined;
  setUser: Dispatch<SetStateAction<User | undefined>>;
  isAuthenticated: boolean;
  handleLogin: (data: AuthSchema) => void;
  isLoginLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  useEffect(() => {
    const user = getUserCredentials();

    if (user) {
      setUser(user);
    }
  }, []);

  const { mutate, isLoading } = useMutation(
    ({ email, password }: AuthSchema) => login({ email, password }),
    { onSuccess, onError }
  );

  function onSuccess(response: GenericRequest<User>, data: AuthSchema) {
    toast.dismiss();

    if (response) {
      const { error, message, user } = response;

      if (!error) {
        if (data.saveLogin) {
          storeUserCredentials(user!);
        }

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

    return toast.error(
      "Não foi possível concluir a operação, tente novamente mais tarde!"
    );
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(undefined);
    router.replace("/");
  }

  function getUserCredentials() {
    const user = localStorage.getItem("user");

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  function storeUserCredentials(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  const handleLogin = (data: AuthSchema) => mutate(data);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        logout,
        isLoginLoading: isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
