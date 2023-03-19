import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Layout from "@/components/Layout";

export default function CourseDetails({ data }) {
  const router = useRouter();
  const { id } = router.query;
  console.log(data);
  return (
    <Layout>
      <div className="py-[120px] px-20">
        <h1>Course Details</h1>
        <p>Course ID: {id}</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps = async (context) => {
  const { id } = context.query;
  const res = await axios.get(
    `http://localhost:3000/api/v1/single-course/${id}`
  );
  const data = await res.data;
  return {
    props: {
      data,
    },
  };
};
