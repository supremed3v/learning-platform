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

const UserDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Courses");
  const openPage = (url) => {
    setActive(url);
  };
  const { user, logout } = useAuth();
  console.log(user);
  const navLinks = [
    {
      name: "Courses",
      component: <UserCourses />,
      icon: (
        <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      name: "Programs",
      component: <UserPrograms />,
      icon: (
        <MdBook className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
    {
      name: "Purchase History",
      component: <PaymentHistory />,
      icon: (
        <MdPayment className="text-2xl text-gray-600 group-hover:text-white " />
      ),
    },
  ];

  const renderComponent = () => {
    return navLinks.map((link) => {
      if (link.name === activeComponent) {
        return link.component;
      }
    });
  };

  return (
    <Layout criteria={false}>
      <div className="flex flex-1 z-0">
        <div className="flex justify-center align-center mt-[88px] flex-1/2 w-[300px] bg-secondary h-screen z-0">
          <div className="flex flex-col justify-start item-center pt-10">
            <h1 className="text-base text-center cursor-pointer font-bold text-white border-b border-gray-100 pb-4 w-full">
              Hi, {user?.name}
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {navLinks.map((link) => (
                <button
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                    link.name === activeComponent && "bg-gray-900"
                  } `}
                  onClick={() => setActiveComponent(link.name)}
                  key={link.name}
                >
                  {link.icon}
                  <h3
                    className={`text-base text-white group-hover:text-white ${
                      link.name === activeComponent && "text-white"
                    } font-semibold`}
                  >
                    {link.name}
                  </h3>
                </button>
              ))}
            </div>
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <button
                  onClick={() => logout() && router.push("/")}
                  className="text-base text-white group-hover:text-white font-semibold "
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-20 pt-[100px] flex-1/3">
          {renderComponent()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
