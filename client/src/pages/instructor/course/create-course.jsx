import { Layout } from '@/components'
import CourseForm from '@/components/Forms/CourseForm'
import React from 'react'


const CreateCourse = () => {
  return (
    <div>
        <Layout criteria={true}>
        <div className="container px-20 ml-10 mt-20 pt-4 mx-auto">
            <CourseForm/>
        </div>
        </Layout>
    </div>
  )
}

export default CreateCourse