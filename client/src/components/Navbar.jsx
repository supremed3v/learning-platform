import { useState, useEffect } from "react";

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
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={` flex p-5  items-center fixed ${
        scroll ? "bg-white shadow-md" : "bg-transparent"
      } w-full z-10 max-w-7xl`}
    >
      <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokelineCap="round"
          strokelineJoin="round"
          strokeWidth="2"
          className="w-10 h-10 text-white p-2 bg-yellow-500 rounded-full"
          viewBox="0 0 24 24"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span className="ml-3 text-xl text-tertiary">E-</span>
        <span className="text-xl text-quaternary">Learn</span>
      </a>
      <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center w-full">
        <a className="mr-5 cursor-pointer hover:text-tertiary animate transition-all ease-in-out">
          First Link
        </a>
        <a className="mr-5 cursor-pointer hover:text-tertiary animate transition-all ease-in-out">
          Second Link
        </a>
        <a className="mr-5 cursor-pointer hover:text-tertiary animate transition-all ease-in-out">
          Third Link
        </a>
        <a className="mr-5 cursor-pointer hover:text-tertiary animate transition-all ease-in-out">
          Fourth Link
        </a>
      </nav>
      <button
        className="group inline-flex items-center bg-primary border-0 py-1 px-3 focus:outline-none 
        hover:bg-tertiary rounded text-base mt-4 md:mt-0 text-white animate transition-all ease-in-out"
      >
        Login
        <svg
          fill="none"
          stroke="currentColor"
          strokelineCap="round"
          strokelineJoin="round"
          strokeWidth="2"
          className="w-4 h-4 ml-1"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
