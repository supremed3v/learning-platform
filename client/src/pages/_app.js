import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </AuthProvider>
    </>
  );
}
