import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Navbar from "../components/Navbar";
import CreateProjectForm from "../components/CreateProjectForm";
import PrivateRoutes from "./PrivateRoutes";
import UpdateProject from "../components/UpdateProject ";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,

    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/home",
    element: (
      <PrivateRoutes>
        <Navbar />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "addProject",
        element: <CreateProjectForm />,
      },
      {
        path: "update-project/:id", // Define the update project route
        element: <UpdateProject />,
      },
    ],
  },
]);

export default function AllRoutes() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
