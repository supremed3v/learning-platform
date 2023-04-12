
'use client'
import { Layout } from "@/components";
import React, { Suspense } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from "next/dynamic";


const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const CourseLayout = ({ course }) => {
  const [tutorial, setTutorial] = React.useState(course.lectures[0].video.url);
  const [selectedVideo, setSelectedVideo] = React.useState(0);

    const changeTutorial = (url, index) => {
        setTutorial(url);
        setSelectedVideo(index);
    }

  return (
    <Layout criteria={true}>
      <div className="container px-5 ml-10 py-20 ">
        <h1 className="text-4xl text-primary font-semibold text-center py-10">
            {course.title} - {course.lectures.length} lectures
        </h1>
        <div className="flex">
          <div className="w-3/4 max-h-full">
            {/* Video section */}
              {tutorial && (
                  <ReactPlayer url={tutorial} controls={true} width="100%" height="100%" />
              )}
          </div>
          <div className="w-2/4 py-4 mx-4 bg-gray-100 drop-shadow-md rounded">
            <div className="flex flex-row ml-4">
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-primary">Playlist</h1>
                <div className="flex flex-col">
                  {course?.lectures?.map((tutorial, index) => (
                    <div className="flex flex-col" key={tutorial._id}>
                      
                      <button
                          onClick={() => changeTutorial(tutorial.video.url, index)}
                          className={`text-xl font-bold text-left bg-primary p-4 rounded mt-4 ${
                            selectedVideo === index ? "text-blue-600" : "text-white"
                          }`}
                        >
                         {index} - {tutorial.title} 
                        </button>
                     
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseLayout;

export const getServerSideProps = async (context) => {
  const { cookies } = context.req;
  const { token } = cookies;

  const { data } = await axios.get(
    `http://localhost:3000/api/v1/me/my-courses/${context.params.id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  console.log(data);

  return {
    props: {
      course: data.course,
    },
  };
};
