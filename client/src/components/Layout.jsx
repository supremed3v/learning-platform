import React from "react";
import { AdminSidebar, Navbar, Footer } from "@/components";
import { useAuth } from "@/context/AuthContext";
import UserDashboard from "@/pages/user/dashboard";
import InstructorDashboard from "@/pages/instructor/dashboard";
const Layout = ({ children, criteria }) => {
  const { user } = useAuth();
  console.log("user", user)
  let dashboard = <UserDashboard/>;
  if (user && user.role === "admin") {
    dashboard = <AdminSidebar/>;
  } else if (user && user.role === "instructor") {
    dashboard = <InstructorDashboard/>;
  }
  return (
    <div>
       {criteria && user ? dashboard : <Navbar/>}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
