import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SidebarMobile from "../Sidebar/SidebarMobile";
import { useAppState } from "@/store/appState";
import { getIniciais } from "@/utils/helper/functions";

const Navbar = () => {
  const user = useAppState((state) => state.user);

  console.log("User Navbar:", user);

  return (
    <nav className="bg-white p-4 shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between lg:justify-end h-10">
          <div className="lg:hidden">
            <SidebarMobile />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-row gap-3 outline-none">
              <h5 className="my-auto">
                Olá, <strong>{user?.name}</strong>
              </h5>
              <Avatar className="my-auto">
                <AvatarImage
                //src="https://github.com/shadcn.png"
                //alt="@shadcn"
                />
                <AvatarFallback>{getIniciais(user?.name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Perfil</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
