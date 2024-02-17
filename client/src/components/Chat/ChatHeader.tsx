import { useAuth } from "@/providers/auth";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Image from "next/image";
import { LogOut } from "react-feather";

export const ChatHeader: React.FC = () => {
  const { user, logout } = useAuth();

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

            <Image
              alt="User"
              src="/img/avatar.jpg"
              width={50}
              height={50}
              className="rounded-full ml-5 object-cover"
            />
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            className="text-danger"
            color="danger"
            onPress={logout}
            startContent={<LogOut />}
          >
            Sair
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
