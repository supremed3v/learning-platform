import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Hero from "@/components/Hero";
import Search from "@/components/Search";
import CoursesLayout from "@/components/CoursesLayout";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  const { user } = useAuth();
  const { courses } = data;
  console.log(user)

  return (
    <>
      <Head>
        <title>E-Learn - Online Learning Platform</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout criteria={false}>
        <Hero />
        <Search />
        <CoursesLayout courses={courses} />
      </Layout>
    </>
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
