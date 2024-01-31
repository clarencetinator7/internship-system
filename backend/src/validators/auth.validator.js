import { check } from "express-validator";
import { pool } from "../config/db.config.js";

import { checkPassword } from "../utils/auth.util.js";

const validateLogin = [
  check("identifier")
    .notEmpty()
    .withMessage("Identifier is required")
    .bail()
    .custom(async (identifier) => {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [identifier, identifier]
      );
      if (rows.length === 0) {
        throw new Error("Account does not exist");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .custom(async (password, { req }) => {
      const identifier = req.body.identifier;

      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [identifier, identifier]
      );

      const user = rows[0];
      if (user) {
        const isPasswordValid = await checkPassword(user, password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
      }

      return true;
    }),
];

const validateRegister = [
  check("userId").notEmpty().withMessage("userId is required"),
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .custom(async (email) => {
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
        email,
      ]);
      if (rows.length > 0) {
        throw new Error("Email is already taken");
      }
      return true;
    }),

  check("username")
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .custom(async (username) => {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
      if (rows.length > 0) {
        throw new Error("Username is already taken");
      }
      return true;
    }),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 16 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&,*._])(?=.*\d).{8,16}$/, "i")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

const validateNewPassword = [
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters")
    .bail()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&,*._])(?=.*\d).{8,16}$/, "i")
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .bail()
    .custom(async (password, { req }) => {
      const { id, code } = req.params;
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE userId = ? AND verificationCode = ? AND codeExpiration > NOW()",
        [id, code]
      );
      if (rows.length > 0) {
        const user = rows[0];
        if (user) {
          const isPasswordValid = await checkPassword(user, password);

          if (isPasswordValid) {
            throw new Error("Password cannot be the same as the old password");
          }
        }
      }
      return true;
    }),

  check("confirmPassword")
    .notEmpty()
    .withMessage("Confirm Password is required")
    .bail()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

const validateForgotPassword = [
  check("identifier")
    .notEmpty()
    .withMessage("Identifier is required")
    .bail()
    .custom(async (identifier) => {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [identifier, identifier]
      );
      if (rows.length === 0) {
        throw new Error("Account does not exist");
      }
      return true;
    }),
];

export {
  validateLogin,
  validateRegister,
  validateForgotPassword,
  validateNewPassword,
};
