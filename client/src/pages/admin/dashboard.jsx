import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Layout from "@/components/Layout";
import DashboardLayout from "@/components/DashboardLayout";
const Dashboard = () => {
  return (
    <div>
      <Head>
        <title>Dashboard - E-learning Platform</title>
      </Head>
      <Layout criteria={true}>
        <div className="container px-20 ml-10 py-10 pt-4 mx-auto">
          <DashboardLayout />
        </div>
      </Layout>
    </div>
  );
};
export default Dashboard;
