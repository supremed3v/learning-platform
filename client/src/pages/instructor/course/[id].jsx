import React, { useState } from "react";
import { Layout } from "@/components";
import axios from "axios";
import Modal from "react-modal";
import { customStyles } from "@/dummyData/links";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

Modal.setAppElement("#__next");

const CoursePreview = ({ course }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    title: course.title,
    description: course.description,
    category: course.category,
    view: course.view,
    amount: course.amount,
    poster: course.poster,
    lectures: course.lectures,
  });
  const [tab, setTab] = useState("course-details");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  

  const [lectureData, setLectureData] = useState({
    title: "",
    description: "",
  });

  const [lectureModal, setLectureModal] = useState(false);

  const [file, setFile] = React.useState({
    file: null
})

const onFileChange = (e) => {
  setFile({ file: e.target.files[0] })
}

const [editLecture, setEditLecture] = useState({
  title: "",
  description: "",
  file: "",
})

  const sendData = async () => {
    const formData = new FormData();
    
    formData.set("title", lectureData.title);
    formData.set("description", lectureData.description);
    formData.set("file", file.file);
    try {
      setLoading(true);
      const { data } = await axios.post(`http://localhost:3000/api/v1/course/add-lecture/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 1000000, // 10 
    });
    console.log(data)
    if(data.success) {
      setLoading(false);
      toast.success("Lecture added successfully");
      setModal2IsOpen(false);
    } 
    } catch (error) {
      
      setLoading(false);
      toast.error("Something went wrong");
      console.log(error)
    }
  }

  const [modal2IsOpen, setModal2IsOpen] = useState(false);

  const handleModal2 = () => {
    setModal2IsOpen(!modal2IsOpen);
  };

  const handleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const lectureModalChange = () => {
    setLectureModal(!lectureModal);
  }

  const handleEditLecture = (lecture) => {
    setEditLecture(lecture)
    setLectureModal(!lectureModal);
  }

  const updateLecture = async () => {
    const formData = new FormData();
    formData.set("title", editLecture.title);
    formData.set("description", editLecture.description);
    formData.set("file", file.file);
    try {
      setLoading(true);
      const { data } = await axios.put(`http://localhost:3000/api/v1/course/lecture/${id}/${editLecture._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 1000000, // 10 
    });
    console.log(data)
    if(data.success) {
      setLoading(false);
      toast.success("Lecture updated successfully");
      setLectureModal(false);
      router.reload();
    } 
    } catch (error) {
      
      setLoading(false);
      toast.error("Something went wrong");
      console.log(error)
    }
  }

  const deleteLecture = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`http://localhost:3000/api/v1/course/lecture/${course._id}/${id}`);
      console.log(data)
      if(data.success) {
        setLoading(false);
        toast.success("Lecture deleted successfully");
        setLectureModal(false);
      } 
      } catch (error) {
        
        setLoading(false);
        toast.error("Something went wrong");
        console.log(error)
      }
  }

  return (
    <div>
      <Layout criteria={true}>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  {course.title}
                </h1>
                <div className="flex mb-4">
                  <button className={`flex-grow ${tab === "course-details" ? " text-purple-500 border-b-2 border-purple-500"  : "border-gray-300"} py-2 text-lg px-1`} onClick={() => setTab('course-details')} >
                    Course Details
                  </button>
                  <button className={`flex-grow ${tab === "lectures" ? " text-purple-500 border-b-2 border-purple-500"  : "border-gray-300"} py-2 text-lg px-1`} onClick={() => setTab('lectures')} >
                    Lectures
                  </button>
                </div>
                {tab === "course-details" && (
                  <>
                <p className="leading-relaxed mb-4">{course.description}</p>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Category</span>
                  <span className="ml-auto text-gray-900">
                    {course.category}
                  </span>
                </div>
                <div className="flex border-t border-gray-200 py-2">
                  <span className="text-gray-500">Views</span>
                  <span className="ml-auto text-gray-900">{course.view}</span>
                </div>
                <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                  <span className="text-gray-500">Number of videos</span>
                  <span className="ml-auto text-gray-900">
                    {course.lectures.length}
                  </span>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${course.amount}
                  </span>
                  <button
                    className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded"
                    onClick={handleModal}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded w-15 h-10 py-2 px-6 border-0 inline-flex items-center justify-center text-white ml-4 bg-purple-500 hover:bg-purple-600"
                    onClick={handleModal2}
                  >
                    Add Lecture
                  </button>
                </div>
                </>
                )}
                {tab === "lectures" && (
                  <div className="flex flex-col">
                    {course.lectures.map((lecture) => (
                      <div className="flex flex-row justify-between items-center mb-4 bg-slate-300 p-2 rounded" key={lecture._id}>
                        <div className="flex flex-col">
                          <h1 className="text-gray-900 text-xl title-font font-medium mb-4">
                            {lecture.title}
                          </h1>
                          <p className="leading-relaxed mb-4">{lecture.description}</p>
                        </div>
                        <div className="flex flex-col gap-4">
                          <button className="rounded w-15 h-10 py-2 px-6 border-0 inline-flex items-center justify-center text-white ml-4 bg-purple-500 hover:bg-purple-600"
                          onClick={() => handleEditLecture(lecture)}
                          >
                            Edit
                          </button>
                          <button className="rounded w-15 h-10 py-2 px-6 border-0 inline-flex items-center justify-center text-white ml-4 bg-purple-500 hover:bg-purple-600" 
                          onClick={() => deleteLecture(lecture._id)}
                           >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
              </div>
                )}
            </div>

            <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-[50%] h-64 object-cover object-center rounded"
                src={course.poster.url}
              />

          </div>
          </div>

        </section>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleModal}
          style={customStyles}
        >
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  Edit Course
                </h1>
                <div className="flex mb-4">
                  <a className="flex-grow text-purple-500 border-b-2 border-purple-500 py-2 text-lg px-1">
                    Course Details
                  </a>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="title"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={courseData.title}
                    onChange={(e) =>
                      setCourseData({ ...courseData, title: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="description"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={courseData.description}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="category"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={courseData.category}
                    onChange={(e) =>
                      setCourseData({ ...courseData, category: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="amount"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Amount
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={courseData.amount}
                    onChange={(e) =>
                      setCourseData({ ...courseData, amount: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="image"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Poster
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={(e) =>
                      setCourseData({ ...courseData, image: e.target.files[0] })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <button className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg">
                  Update
                </button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={modal2IsOpen}
          onRequestClose={handleModal2}
          style={customStyles}
        >
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                  Add Lecture
                </h1>
                <div className="flex mb-4">
                  <label
                    htmlFor="title"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={lectureData.title}
                    onChange={(e) =>
                      setLectureData({ ...lectureData, title: e.target.value })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="flex mb-4">
                  <label
                    htmlFor="video"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Video
                  </label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={onFileChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="flex mb-4">
                  <label
                    htmlFor="description"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Content
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={lectureData.content}
                    onChange={(e) =>
                      setLectureData({
                        ...lectureData,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 lg:border-l border-gray-200 lg:mt-0 mt-10 lg:text-left text-center">
                <div className="flex flex-col sm:flex-row mt-10">
                  <button className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                    onClick={sendData} disabled={loading}
                  >
                    {loading ? "Uploading video..." : "Add Lecture"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
         isOpen={lectureModal}
         onRequestClose={lectureModalChange}
         style={customStyles}
        >
         
            <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                <div className="flex mb-4">
                  <label
                    htmlFor="title"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Title
                  </label>
                  <input

                    type="text"
                    id="title"
                    name="title"
                    value={editLecture.title}
                    onChange={(e) =>  setEditLecture({ ...editLecture, title: e.target.value })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="flex mb-4">
                  <label
                    htmlFor="video"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Video
                  </label>
                  <input
                    type="file"
                    id="video"
                    name="video"
                    onChange={onFileChange}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="flex mb-4">
                  <label
                    htmlFor="description"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Content
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={editLecture.description}
                    onChange={(e) =>  setEditLecture({ ...editLecture, description: e.target.value })}

                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
                <div className="flex mb-4">
                  Watch
                  <video
                    src={editLecture.video?.url}
                    controls
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out
                     sm:w-[250px]
                    "
                  />

                </div>
                <div className="flex mb-4 px-4">
                  <button className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg" onClick={updateLecture} disabled={loading}>
                    Update
                    </button>
                </div>
              </div>
              </div>
              </div>
          
        </Modal>
      </Layout>
    </div>
  );
};

export default CoursePreview;

export const getServerSideProps = async (context) => {
  const { params } = context;
  const { id } = params;
  const { cookies } = context.req;
  const { token } = cookies;

  const { data } = await axios.get(
    `http://localhost:3000/api/v1/instructor/course/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return {
    props: {
      course: data.course,
    },

  };
};
