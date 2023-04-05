
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
