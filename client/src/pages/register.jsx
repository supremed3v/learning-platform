import { Layout } from "@/components";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const formValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    const { data } = await toast.promise(
      axios.post("http://localhost:3000/api/v1/register", formData),
      {
        pending: "Loading...",
        success: "Registration successful",
        error: "Registration failed",
      }
    );
    if (data.status === "success") {
      setTimeout(() => {
        toast.success("Redirecting to login page");
        router.push("/login");
      }, 2000);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <Layout criteria={false}>
      <div className="container px-20 ml-10 py-40 pt-20 mx-auto">
        <h1 className="text-center border-b-2 text-secondary font-bold text-3xl py-6">
          Choose your role
          <br />
          to get started with us
        </h1>
        <div className="flex justify-center mt-20">
          <div className="flex justify-center px-5 w-1/2 items-center">
            <div className="flex flex-col px-4 mt-4 justify-center">
              <Link
                href="/auth/register"
                className="group p-4 w-[300px] rounded shadow-card hover:bg-primary animate
            transition duration-200 ease-in-out"
              >
                <h1 className="group-hover:text-white text-center">
                  Start your learning journey
                </h1>
              </Link>
            </div>
            <div className="flex flex-col mt-4 justify-center">
              <Link
                href="/auth/instructor-register"
                className="group p-4 w-[300px] rounded shadow-card hover:bg-primary animate
            transition duration-200 ease-in-out"
              >
                <h1 className="group-hover:text-white text-center">
                  Become an instructor
                </h1>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
