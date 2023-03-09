import AdminSidebar from "@/components/AdminSidebar";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { AiOutlinePlayCircle } from "react-icons/ai";
import Layout from "@/components/Layout";
const dashboard = () => {
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/courses").then((res) => {
      setCourses(res.data.courses);
    });
  }, []);
  const [courses, setCourses] = useState([]);

  return (
    <div>
      <Head>
        <title>Dashboard - E-learning Platform</title>
      </Head>
      <Layout criteria={true}>
        <div className="container px-20 ml-10 py-10 pt-4 mx-auto">
          <h1>Dashboard</h1>
        </div>
      </Layout>
    </div>
  );
};
export default dashboard;
