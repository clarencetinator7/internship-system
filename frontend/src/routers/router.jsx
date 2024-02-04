import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import RegisterPage from "../pages/Register/RegisterPage";
import VerifyEmailPage, {
  VerifyEmailPageLoader,
} from "../pages/VerifyEmailPage/VerifyEmailPage";

export const router = createBrowserRouter([
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
        path: "dashboard",
        element: <h1 className="bg-white">Dashboard</h1>,
      },
    ],
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/activate/:id/:code",
    element: <VerifyEmailPage />,
    loader: VerifyEmailPageLoader,
  },
]);
