import { Helmet } from "react-helmet-async";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Layout from "@/components/global/Layout/Layout";
import CadastroEquipa from "./Body";

const Minutes = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Equipa</title>
      </Helmet>
      <Layout>
        <div className="flex flex-row justify-between align-middle">
          <h1 className="text-2xl font-semibold">Equipa</h1>
        </div>
        <CadastroEquipa />
      </Layout>
    </>
  );
};

export default Minutes;
