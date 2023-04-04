import React from "react";
import { Sidebar, Navbar, Footer } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { instructorLinks, adminLinks, userLinks } from "@/dummyData/links";
const Layout = ({ children, criteria }) => {
  const { user } = useAuth();
  console.log("user", user)
  let dashboard = <Sidebar links={userLinks} title={"User Dashboard"} />;
  if (user && user.role === "admin") {
    dashboard = <Sidebar links={adminLinks} title={"Admin Dashboard"} />;
  } else if (user && user.role === "instructor") {
    dashboard = <Sidebar links={instructorLinks} title={"Instructor Dashboard"} />;
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
