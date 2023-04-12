import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Layout } from "@/components";
import axios from "axios";

const UserCourses = ({courses}) => {
  const { user } = useAuth();
  return (
    <Layout criteria={true}>
      {user?.playList.length < 1 && (
        <>
          <h1 className="text-2xl text-center">
            You have not enrolled in any course yet
          </h1>
          <div className="flex justify-center items-center">
            <Link
              href="/courses"
              className="mt-20 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded ease-in-out animate transition-all"
            >
              Enroll Now
            </Link>
          </div>
        </>
      )}
      {user?.playList.length > 0 && (
        <>
          <h1 className="text-2xl text-center">Your Courses</h1>
          {courses?.map((course) => (
              <div className="flex justify-center items-center">
                <Link
                  href={`/user/course/${course._id}`}
                  className="mt-20 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded ease-in-out animate transition-all"
                 query={{
                  data: JSON.stringify(course)
                 }}
                >
                  {course.title}
                </Link>
              </div>
            ))
          }
          <div className="flex justify-center items-center">
            <Link
              href="/courses"
              className="mt-20 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded ease-in-out animate transition-all"
            >
              Enroll More
            </Link>
          </div>
        </>
      )}
    </Layout>
  );
};

export default UserCourses;


// Path: client/src/pages/user/courses.jsx

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { token } = cookies;

  const { data } = await axios.get(
    "http://localhost:3000/api/v1/me/my-courses",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data)

  return {
    props: {
      courses: data.courses,
    },

  };
};
