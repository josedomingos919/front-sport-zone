import Layout from "@/components/global/Layout/Layout";
import { Helmet } from "react-helmet-async";
import DashboardBody from "./Body";
import { FaFutbol, FaHandsHelping, FaClock } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Layout>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <DashboardBody />
      </Layout>
    </>
  );
};

export default Dashboard;
