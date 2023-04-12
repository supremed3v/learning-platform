import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
const Navbar = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 20) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    if (!window.location.pathname.includes("/admin")) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user } = useAuth();

  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Courses",
      path: "/courses",
    },
    {
      title: "Programs",
      path: "/programs",
    },
    {
      title: "Professional Education",
      path: "/professional-education",
    },
    {
      title: "Admissions",
      path: "/addmissions",
    },
  ];

  return (
    <div
      className={` flex p-5  items-center fixed ${
        scroll
          ? "bg-yellow-500 shadow-md animate transition-all ease-in-out duration-500"
          : "bg-transparent shadow-md"
      } w-full z-10 max-w-full`}
    >
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl text-tertiary">E-</span>
        <span className="text-xl text-tertiary">Learn</span>
      </a>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center ml-20 text-base justify-center w-full">
        {navLinks.map((link, index) => (
          <Link
            href={link.path}
            key={index}
            className={`mr-5 cursor-pointer ${
              scroll
                ? "text-white hover:text-tertiary"
                : "text-primary  hover:text-purple-900"
            } animate transition-all ease-in-out font-medium px-4 `}
          >
            {link.title}
          </Link>
        ))}
      </nav>
      {user && user.role === "admin" && (
        <div>
          <Link href="/admin/dashboard">
            <button
              className={`mr-5 cursor-pointer ${
                scroll
                  ? "text-white hover:text-tertiary"
                  : "text-primary  hover:text-purple-900"
              } animate transition-all ease-in-out font-bold px-4 w-full`}
            >
              Admin Dashboard
            </button>
          </Link>
        </div>
      )}
      {user && user.role === "user" && (
        <div className="w-[200px]">
          <Link href="/user/dashboard">
            <button
              className={`mr-5 cursor-pointer ${
                scroll
                  ? "text-white hover:text-tertiary"
                  : "text-primary  hover:text-purple-900"
              } animate transition-all ease-in-out font-bold px-4`}
            >
              Learn Now
            </button>
          </Link>
        </div>
      )}
      {user && user.role === "instructor" && (
        <div>
          <Link href="/instructor/dashboard">
            <button
              className={`mr-5 cursor-pointer ${
                scroll
                  ? "text-white hover:text-tertiary"
                  : "text-primary  hover:text-purple-900"
              } animate transition-all ease-in-out font-bold px-4`}
            >
              Instructor Dashboard
            </button>
          </Link>
        </div>
      )}
      {!user && (
        <>
          <Link
            href="/login"
            className={`group inline-flex items-center border-0 py-1 px-3 focus:outline-none 
      hover:bg-primary rounded text-base hover:text-white ${
        scroll ? "text-white" : "text-primary"
      } mt-4 md:mt-0 animate transition-all ease-in-out
      ml-4`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className={`group inline-flex items-center bg-primary border-0 py-1 px-3 focus:outline-none 
        hover:bg-tertiary rounded text-base text-white mt-4 md:mt-0 animate transition-all ease-in-out
        ml-4`}
          >
            Register
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
