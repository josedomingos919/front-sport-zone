import { FaHome, FaTable } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaCommentsDollar } from "react-icons/fa";

export const sidebarmenus = [
  {
    title: "Dashboard",
    icon: <FaHome />,
    to: "/dashboard",
  },
  {
    title: "Financeiro",
    icon: <FaCommentsDollar />,
    to: "/timelines",
  },
  {
    title: "Notulensi",
    icon: <FaNoteSticky />,
    to: "/minutes",
  },
];
