import { FaHome, FaTable } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCommentsDollar } from "react-icons/fa";
import { ImFlag } from "react-icons/im";
import { RiUserSettingsFill } from "react-icons/ri";
import { PiCertificateFill } from "react-icons/pi";

export const sidebarmenus = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    to: "/dashboard",
  },
  {
    title: "Financeiro",
    icon: <FaCommentsDollar />,
    to: "/financeiro",
  },
  {
    title: "Utilizadores",
    icon: <RiUserSettingsFill />,
    to: "/utilizadores",
  },
  {
    title: "Clubes",
    icon: <PiCertificateFill />,
    to: "/clube",
  },
  {
    title: "Equipa",
    icon: <ImFlag />,
    to: "/equipa",
  },
];
