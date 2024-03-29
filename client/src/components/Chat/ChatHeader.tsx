import { useAuth } from "@/providers/auth";
import { useChat } from "@/providers/chat";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { LogOut } from "react-feather";

export const ChatHeader: React.FC = () => {
  const { user, logout } = useAuth();
  const { setCurrentChat } = useChat();

  function handleLogout() {
    logout();
    setCurrentChat(undefined);
  }

  return (
    <div className="flex items-center justify-between p-5 py-3 shadow">
      <div>
        <h1 className="font-semibold text-lg">Mensagens</h1>
      </div>

      <Dropdown>
        <DropdownTrigger>
          <div className="flex items-center">
            <div className="flex flex-col items-end">
              <p className="font-medium">{user?.name}</p>
              <p className="text-sm text-zinc-400">{user?.email}</p>
            </div>

            <Avatar name={user?.name || ""} className="ml-5" />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            className="text-danger"
            color="danger"
            onPress={handleLogout}
            startContent={<LogOut />}
          >
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
