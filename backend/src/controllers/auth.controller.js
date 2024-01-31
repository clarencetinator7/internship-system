import moment from "moment";
import asyncHandler from "express-async-handler";

import { pool } from "../config/db.config.js";

import {
  generateToken,
  generateCode,
  hashPassword,
  sendEmailVerification,
} from "../utils/auth.util.js";

// @route   GET /auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { identifier } = req.body;
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [identifier, identifier]
  );

  if (rows[0].accountStatus !== "verified") {
    const code = await generateCode();
    const expiration = moment()
      .add(15, "minutes")
      .format("YYYY-MM-DD HH:mm:ss");

    const [result] = await pool.query(
      "UPDATE users SET verificationCode = ?, codeExpiration = ? WHERE username = ? OR email = ?",
      [code, expiration, identifier, identifier]
    );

    if (result.affectedRows > 0) {
      const isSent = await sendEmailVerification(
        "register",
        rows[0].userId,
        rows[0].email,
        code
      );
      if (isSent) {
        console.log(rows[0].email);
        res.status(200).json({
          success: true,
          message:
            "To be able to use your account, please activate it first by clicking the link sent to your email.",
        });
      }
    }
  } else {
    res
      .cookie("token", await generateToken(rows[0].userId, "7d"), {
        withCredentials: true,
        httpOnly: false,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful.",
      });
  }
});

// @route   GET /auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { userId, firstName, lastName, username, email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const code = await generateCode();
  const expiration = moment().add(15, "minutes").format("YYYY-MM-DD HH:mm:ss");

  const [result] = await pool.query(
    "INSERT INTO users (userId, firstName, lastName, username, email, password,verificationCode,codeExpiration) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      userId,
      firstName,
      lastName,
      username,
      email,
      hashedPassword,
      code,
      expiration,
    ]
  );

  if (result.affectedRows > 0) {
    const isSent = await sendEmailVerification("register", userId, email, code);

    if (isSent) {
      res.status(200).json({
        success: true,
        message:
          "To be able to use your account, please activate it first by clicking the link sent to your email.",
      });
    }
  }
});

// @route   GET /auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const { identifier } = req.body;
  const code = await generateCode();
  const expiration = moment().add(15, "minutes").format("YYYY-MM-DD HH:mm:ss");

  const [rows] = await pool.query(
    "SELECT * FROM users WHERE username = ? OR email = ?",
    [identifier, identifier]
  );

  if (rows.length === 0) {
    return res.status(404).json({
      success: false,
      message: "User Not Found.",
    });
  }

  const [result] = await pool.query(
    "UPDATE users SET verificationCode = ?, codeExpiration = ? WHERE  userId = ?",
    [code, expiration, rows[0].userId]
  );

  if (result.affectedRows > 0) {
    const isSent = await sendEmailVerification(
      "new-password",
      rows[0].userId,
      rows[0].email,
      code
    );

    if (isSent) {
      res.status(200).json({
        success: true,
        message: "To be able to change your password, please check your email.",
      });
    }
  }
});

// @route   PUT /auth/new-password/:id/:code
// @access  Private
const newPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashPassword(password);

  const { id, code } = req.params;
  const [result] = await pool.query(
    "UPDATE users SET password = ?, verificationCode = ?  WHERE userId = ? AND verificationCode = ? AND codeExpiration > NOW()",
    [hashedPassword, 0, id, code]
  );

  if (result.affectedRows > 0) {
    return res.status(200).json({
      success: true,
      message: "Password successfully changed",
    });
  } else {
    res.status(403);
    throw new Error("Not authorized.");
  }
});

// @route   PUT /auth/activate/:id/:code
// @access  Private
const activateCode = asyncHandler(async (req, res, next) => {
  const { id, code } = req.params;

  const [result] = await pool.query(
    "UPDATE users SET verificationCode = ?,  accountStatus = ? WHERE userId = ? AND verificationCode = ? AND codeExpiration > NOW()",
    [0, "verified", id, code]
  );

  if (result.length === 0) {
    return res.status(403).json({
      success: false,
      message: "Not authorized.",
    });
  }

  return res.status(200).json({
    success: true,
    message:
      "Your account has been activated. You can now login to your account.",
  });
});

// @route   GET /auth/verify/:id/:code
// @access  Private
const verifyCode = asyncHandler(async (req, res, next) => {
  const { id, code } = req.params;

  const [result] = await pool.query(
    "SELECT * FROM users WHERE userId = ? AND verificationCode = ? AND codeExpiration > NOW()",
    [id, code]
  );

  if (result.length === 0) {
    return res.status(403).json({
      success: false,
      message: "Not authorized.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Authorized",
  });
});

export {
  login,
  register,
  forgotPassword,
  newPassword,
  activateCode,
  verifyCode,
};
