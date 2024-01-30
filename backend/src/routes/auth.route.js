import express from "express";

import {
  validateLogin,
  validateRegister,
  validateNewPassword,
  validateForgotPassword,
} from "../validators/auth.validator.js";
import {
  login,
  register,
  forgotPassword,
  newPassword,
  verifyCode,
} from "../controllers/auth.controller.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";

const authRoute = express.Router();

authRoute.post("/login", validateMiddleware(validateLogin), login);
authRoute.post("/register", validateMiddleware(validateRegister), register);
authRoute.post(
  "/forgot-password",
  validateMiddleware(validateForgotPassword),
  forgotPassword
);
authRoute.put(
  "/verify/:id/:code",

  verifyCode
);

authRoute.put(
  "/new-password/:id/:code",
  validateMiddleware(validateNewPassword),
  newPassword
);

export { authRoute };
