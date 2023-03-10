import React from "react";
import { AdminSideBar, Navbar, Footer } from "@/components";

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
