import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import LandingPage from "../pages/LandingPage/LandingPage";

export const router = createBrowserRouter([
  // Sample index path
  {
    path: "/",
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <div>Hello World</div>,
      },
      {
        path: "dashboard",
        element: <h1 className="bg-white">Dashboard</h1>,
      },
    ],
  },
]);
