import React from "react";
import { AdminSidebar, Navbar, Footer } from "@/components";
import { useAuth } from "@/context/AuthContext";
const Layout = ({ children, criteria }) => {
  const { user } = useAuth();
  console.log("user", user)
  return (
    <div>
      {criteria ? user.role === "admin" ? <AdminSidebar/> : <Navbar/> : <Navbar />}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
