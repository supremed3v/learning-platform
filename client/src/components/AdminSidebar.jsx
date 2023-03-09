import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import {
  MdOutlineSpaceDashboard,
  MdOutlineAnalytics,
  MdOutlineIntegrationInstructions,
  MdOutlineMoreHoriz,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegComments } from "react-icons/fa";
import { BiMessageSquareDots } from "react-icons/bi";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(
    typeof window !== "undefined" ? window.location.pathname : ""
  );

  const openPage = (url) => {
    setActive(url);
  };

  const links = [
    {
      name: "Dashboard",
      icon: (
        <MdOutlineSpaceDashboard className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/dashboard",
    },
    {
      name: "Courses",
      icon: (
        <MdOutlineAnalytics className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/courses",
    },
    {
      name: "Integrations",
      icon: (
        <MdOutlineIntegrationInstructions className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/integrations",
    },
    {
      name: "More",
      icon: (
        <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
      ),
      href: "/admin/more",
    },
  ];

  return (
    <div>
      <div as="nav">
        <button
          className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
        </button>
        <div
          className={`p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ${
            !isOpen && "hidden"
          } ease-out delay-150 duration-200`}
        >
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              Admin Dashboard
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {links.map((link) => (
                <Link
                  href={link.href}
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                    link.href === active && "bg-gray-900"
                  } `}
                  onClick={() => openPage(link.href)}
                  id={link.href}
                >
                  {link.icon}
                  <h3
                    className={`text-base text-gray-800 group-hover:text-white ${
                      link.href === active && "text-white"
                    } font-semibold`}
                  >
                    {link.name}
                  </h3>
                </Link>
              ))}
            </div>
            {/* setting  */}
            {/* <div className=" my-4 border-b border-gray-100 pb-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineSettings className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Settings
                </h3>
              </div>
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineMoreHoriz className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  More
                </h3>
              </div>
            </div> */}
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Logout
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
