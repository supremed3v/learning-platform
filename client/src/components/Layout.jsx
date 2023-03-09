import React from "react";
import AdminSidebar from "./AdminSidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children, criteria }) => {
  return (
    <div>
      {criteria ? <AdminSidebar /> : <Navbar />}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
