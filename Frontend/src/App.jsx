import AllRoutes from "./routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <AllRoutes />
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}
