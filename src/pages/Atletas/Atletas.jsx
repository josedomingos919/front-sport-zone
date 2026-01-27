import Layout from "@/components/global/Layout/Layout";
import ClubeTable from "./Body";

import { Helmet } from "react-helmet-async";

const Clube = () => {
  return (
    <>
      <Helmet>
        <title>Atletas</title>
      </Helmet>
      <Layout>
        <h1 className="text-2xl font-semibold">Atletas</h1>
        <ClubeTable />
      </Layout>
    </>
  );
};

export default Clube;
