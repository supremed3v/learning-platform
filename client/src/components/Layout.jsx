import React from "react";
import { AdminSidebar, Navbar, Footer } from "@/components";
import { useAuth } from "@/context/AuthContext";
const Layout = ({ children, criteria }) => {
  return (
    <div>
      {criteria ? <AdminSidebar /> : <Navbar />}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
