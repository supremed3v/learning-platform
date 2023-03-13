import { Layout } from "@/components";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const InstructorRegister = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState({});
  const [preview, setPreview] = useState("");
  const router = useRouter();

  const formValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const formAvatar = (e) => {
    setAvatar(e.target.files[0]);
    previewImage(e);
  };

  const previewImage = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("file", avatar);

    const { data } = await toast.promise(
      axios.post("http://localhost:3000/api/v1/register-instructor", formData),
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
    }
  };

  useEffect(() => {
    router.prefetch("/login");
  }, []);

  return (
    <Layout criteria={false}>
      <div className="container px-20 ml-10 py-20 pt-10 mx-auto">
        <div className="flex flex-col items-center mt-20 pt-6 sm:justify-center sm:pt-0 bg-gray-50">
          <div className="pt-10">
            <h3 className="text-4xl font-bold text-primary">
              Signup as instructor
            </h3>
          </div>
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <form>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Name
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="text"
                    name="name"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={values.name}
                    onChange={formValues}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Email
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="email"
                    name="email"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={values.email}
                    onChange={formValues}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="avatar"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm border rounded-lg cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 dark:placeholder-gray-400"
                  aria-describedby="file_input_help"
                  id="file_input"
                  type="file"
                  name="avatar"
                  onChange={formAvatar}
                />
                {preview && (
                  <img
                    src={preview}
                    alt="avatar"
                    className="w-20 h-20 rounded-full"
                  />
                )}
                <p
                  className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                  id="file_input_help"
                >
                  SVG, PNG, JPG or GIF (MAX. 800x400px).
                </p>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={values.password}
                    onChange={formValues}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="confirmPassword"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    value={values.confirmPassword}
                    onChange={formValues}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="#"
                >
                  Already registered?
                </a>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer
          position="bottom-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Layout>
  );
};

export default InstructorRegister;
