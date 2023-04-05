import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>

      <ToastContainer position="bottom-left" />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
