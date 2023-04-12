import { Layout } from "@/components";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  MdOutlineAnalytics,
  MdPayment,
  MdBook,
  MdOutlineLogout,
} from "react-icons/md";
import UserCourses from "./courses";
import PaymentHistory from "./payment-history";
import UserPrograms from "./programs";
import DashboardLayout from "@/components/DashboardLayout";
import Head from "next/head";

const UserDashboard = () => {

  

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

export default UserDashboard;
