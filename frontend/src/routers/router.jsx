import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import RegisterPage from "../pages/Register/RegisterPage";
import VerifyEmailPage, {
  VerifyEmailPageLoader,
} from "../pages/VerifyEmailPage/VerifyEmailPage";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import NewPassword from "../pages/NewPassword/NewPassword"; // NewPasswordLoader,

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    index: true,
  },
  {
    path: "dashboard",
    element: <h1 className="bg-white">Dashboard</h1>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/new-password/:id/:code",
    element: <NewPassword />,
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
