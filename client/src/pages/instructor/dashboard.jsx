import { Layout } from '@/components'
import DashboardLayout from '@/components/DashboardLayout'
import Head from 'next/head'
import React from 'react'
import {toast} from 'react-toastify'

const InstructorDashboard = () => {

  const handleClick = () => {
    toast.success("Hello");
  };
  
  return (
    <div>
       <Head>
        <title>Dashboard - E-learning Platform</title>
      </Head>
      <Layout criteria={true}>
        <div className="container px-20 ml-10 py-10 pt-4 mx-auto">
          <DashboardLayout />
          <button onClick={handleClick}>Click me</button>
          {/* <Alert message={"Hello"}  /> */}
        </div>
      </Layout>
    </div>
  )
}

export default InstructorDashboard