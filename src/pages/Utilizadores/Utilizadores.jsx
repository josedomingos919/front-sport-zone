import Layout from "@/components/global/Layout/Layout";
import FinanceTable from "./Body";

import { Helmet } from "react-helmet-async";

const Utilizadores = () => {
  return (
    <>
      <Helmet>
        <title>Utilizadores</title>
      </Helmet>
      <Layout>
        <h1 className="text-2xl font-semibold">Utilizadores</h1>
        <FinanceTable />
      </Layout>
    </>
  );
};

export default Utilizadores;
