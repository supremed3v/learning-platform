import React, {useState} from 'react'
import { Layout } from '@/components'
import axios from 'axios'
import Modal from 'react-modal'

const CoursePreview = ({course}) => {
  return (
    <div>
        <Layout criteria={true}>
        <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{course.title}</h1>
        <div className="flex mb-4">
          <a className="flex-grow text-purple-500 border-b-2 border-purple-500 py-2 text-lg px-1">Description</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Reviews</a>
          <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Details</a>
        </div>
        <p className="leading-relaxed mb-4">{course.description}</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Category</span>
          <span className="ml-auto text-gray-900">{course.category}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Views</span>
          <span className="ml-auto text-gray-900">{course.view}</span>
        </div>
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500">Number of videos</span>
          <span className="ml-auto text-gray-900">{course.lectures.length}</span>
        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">${course.amount}</span>
          <button className="flex ml-auto text-white bg-purple-500 border-0 py-2 px-6 focus:outline-none hover:bg-purple-600 rounded">Edit</button>
          
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={course.poster.url}/>
    </div>
  </div>
</section>
<Modal>
    <h1>hello</h1>
</Modal>
        </Layout>
    </div>
  )
}

export default CoursePreview

export const getServerSideProps = async (context) => {
    const { params } = context
  const { id } = params
  const { cookies} = context.req
  const { token } = cookies

    const { data } = await axios.get(`http://localhost:3000/api/v1/instructor/course/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log(data.course)

  return {
    props: {
        course: data.course
    },
  }
}