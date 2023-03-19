import React from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const UserCourses = () => {
  const { user } = useAuth();
  return (
    <div>
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
    </div>
  );
};

export default UserCourses;
