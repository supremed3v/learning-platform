import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  MdOutlineLogout,
} from "react-icons/md";
import { CgHome } from "react-icons/cg";

function Sidebar({links, title}) {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState(
    typeof window !== "undefined" ? window.location.pathname : ""
  );
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const openPage = (url) => {
    setActive(url);
  };

 

  return (
    <div>
      <div as="nav">
        <button
          className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
          onClick={() => setIsOpen(!isOpen)}
        >
          <GiHamburgerMenu className="block h-6 w-6" aria-hidden="true" />
        </button>
        <Link
          href="/"
          className="absolute top-4 right-16 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
        >
          <CgHome className="block h-6 w-6" aria-hidden="true" />
        </Link>
        <button
          onClick={handleLogout}
          className="absolute top-4 right-24 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group"
        >
          <MdOutlineLogout className="block h-6 w-6" aria-hidden="true" />
        </button>
        <div
          className={`p-6 w-1/2 h-screen bg-white z-20 fixed top-0 -left-96 lg:left-0 lg:w-60  peer-focus:left-0 peer:transition ${
            !isOpen && "hidden"
          } ease-out delay-150 duration-200`}
        >
          <div className="flex flex-col justify-start item-center">
            <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
              {title}
            </h1>
            <div className=" my-4 border-b border-gray-100 pb-4">
              {links.map((link) => (
                <Link
                  href={link.href}
                  className={`flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto ${
                    link.href === active && "bg-gray-900"
                  } `}
                  onClick={() => openPage(link.href)}
                  key={link.href}
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
            {/* logout */}
            <div className=" my-4">
              <div className="flex mb-2 justify-start items-center gap-4 pl-5 border border-gray-200  hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto">
                <MdOutlineLogout className="text-2xl text-gray-600 group-hover:text-white " />
                <button
                  onClick={() => logout() && router.push("/")}
                  className="text-base text-gray-800 group-hover:text-white font-semibold "
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
