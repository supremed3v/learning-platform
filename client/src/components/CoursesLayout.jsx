import React from "react";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { Link } from "next/link";

const CoursesLayout = ({ courses }) => {
  return (
    <section className="text-gray-600 body-font">
      <h1 className="text-primary text-center text-6xl">Top Rated Courses</h1>
      <div className="container px-5 py-10 mx-auto">
        {courses.map((course) => (
          <div className="flex flex-wrap -m-4" key={course._id}>
            <div
              className="group lg:w-1/4 md:w-1/2 p-4 w-full rounded shadow-md hover:bg-primary animate
               transition duration-200 ease-in-out"
            >
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src={course.poster.url}
                />
              </a>
              <div className="mt-4">
                <h3
                  className="text-gray-500 text-xs tracking-widest title-font mb-1
                group-hover:text-white
                "
                >
                  {course.category}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium group-hover:text-white">
                  {course.title}
                </h2>
                <p className="mt-1 group-hover:text-gray-200">$16.00</p>
                <div className="flex items-center flex-wrap">
                  <button className="text-indigo-500 group-hover:text-gray-300 inline-flex items-center md:mb-2 lg:mb-0">
                    Learn More
                    <svg
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </button>
                  <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                    <svg
                      className="w-4 h-4 mr-1"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    {course.view + " Views"}
                  </span>
                  <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                    <AiOutlinePlayCircle className="w-4 h-4 mr-1" />
                    {course.numOfVideos + " Videos"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesLayout;
