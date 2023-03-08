import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";

const Search = () => {
  return (
    <div className="flex items-center justify-evenly mb-20 shadow-md p-5 px-20">
      <div className="flex float-left">
        <div className="relative text-gray-600 focus-within:text-gray-400 mr-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <FiSearch className="w-6 h-6" />
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="py-2 text-sm text-white bg-gray-300 rounded-md pl-10 focus:outline-none focus:bg-gray-400 focus:text-white"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
        <div className="relative text-gray-600 focus-within:text-gray-400 mr-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <FiUser className="w-6 h-6" />
            </button>
          </span>
          <input
            type="search"
            name="q"
            className="py-2 text-sm text-white bg-gray-300 rounded-md pl-10 focus:outline-none focus:bg-gray-400 focus:text-white"
            placeholder="Search..."
            autoComplete="off"
          />
        </div>
      </div>
      <button className="text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded text-lg">
        Search
      </button>
    </div>
  );
};

export default Search;
