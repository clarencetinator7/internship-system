import { createBrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/Register/RegisterPage";

export const router = createBrowserRouter([
  // Sample index path
  {
    path: "/",
    element: <div>Hello World!</div>,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
