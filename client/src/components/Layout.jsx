import React from "react";
import { AdminSidebar, Navbar, Footer } from "@/components";

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
