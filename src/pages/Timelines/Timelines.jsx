import Layout from "@/components/global/Layout/Layout";
import FinanceTable from "./Body";

import { Helmet } from "react-helmet-async";

const Timelines = () => {
  return (
    <>
      <Helmet>
        <title>Financeiro</title>
      </Helmet>
      <Layout>
        <h1 className="text-2xl font-semibold">Financeiro</h1>
        <FinanceTable />
      </Layout>
    </>
  );
};

export default Timelines;
