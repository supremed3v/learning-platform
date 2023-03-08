import React from "react";

const Search = () => {
  return (
    <div className="flex items-center justify-center mb-20 shadow-md p-5">
      <div className="inline-flex bg-gray-100 rounded border border-gray-200">
        <div className="inline bg-gray-200 py-2 px-4 text-gray-600 select-none">
          @
        </div>
        <input
          type="text"
          placeholder="(ex. Ash, Cooper, Viper)"
          value=""
          className="bg-transparent border-transparent w-full py-1 text-gray-600 px-4 focus:outline-none"
        />
      </div>

      <div className="inline-flex justify-between bg-gray-100 rounded border border-gray-200">
        <input
          type="text"
          placeholder="(ex. mike)"
          value=""
          className="bg-transparent py-1 text-gray-600 px-4 focus:outline-none"
        />
        <div className="inline bg-gray-200 py-2 px-4 text-gray-600 select-none">
          @gmail.com
        </div>
      </div>
      <div className="inline-flex justify-between bg-gray-100 rounded border border-gray-200">
        <input
          type="text"
          placeholder="(ex. mike)"
          value=""
          className="bg-transparent py-1 text-gray-600 px-4 focus:outline-none"
        />
        <div className="inline bg-gray-200 py-2 px-4 text-gray-600 select-none">
          @gmail.com
        </div>
      </div>
    </div>
  );
};

export default Search;
