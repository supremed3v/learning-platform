import { Layout } from "@/components";
import CoursesLayout from "@/components/CoursesLayout";
import React from "react";

export default function CoursesPage({ data }) {
  const { courses } = data;
  return (
    <Layout>
      <div className="pt-[100px]">
        <CoursesLayout courses={courses} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/v1/course");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};
