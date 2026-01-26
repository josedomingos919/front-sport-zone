import { FaHome, FaTable } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCommentsDollar } from "react-icons/fa";
import { ImFlag } from "react-icons/im";

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
    title: "Equipa",
    icon: <ImFlag />,
    to: "/equipa",
  },
];
