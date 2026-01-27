import CalendarioBody from "./Body";
import Layout from "@/components/global/Layout/Layout";

import { Helmet } from "react-helmet-async";

const Calendario = () => {
  return (
    <>
      <Helmet>
        <title>Calendário</title>
      </Helmet>
      <Layout>
        <h1 className="text-2xl font-semibold flex gap-3">
          <span>📅</span> Calendário
        </h1>
        <CalendarioBody />
      </Layout>
    </>
  );
};

export default Calendario;
