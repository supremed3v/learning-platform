import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Layout } from "@/components";

const UserCourses = () => {
  const { user } = useAuth();
  console.log("user", user)
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
          {user?.playList.map((course) => (
              <div className="flex justify-center items-center">
                <Link
                  href={`/courses/${course._id}`}
                  className="mt-20 bg-blue-500 hover:bg-blue-700 text-white p-2 rounded ease-in-out animate transition-all"
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
