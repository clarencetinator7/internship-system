import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

import { pool } from "../config/db.config.js";

import { createEmail } from "./email.util.js";

const generateToken = (id, expiresIn) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET || "",
    {
      expiresIn,
    }
  );
};

const generateCode = asyncHandler(async () => {
  let code;

  do {
    code = crypto.randomBytes(20).toString("hex");
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE verificationCode = ?",
      [code]
    );
    if (rows.length === 0) {
      return code;
    }
  } while (true);
});

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const checkIdentifier = async (identifier) => {
  let identierType;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(identifier)) {
    identierType = "email";
  } else {
    identierType = "username";
  }
  return identierType;
};

const checkPassword = async (user, password) => {
  if (user && (await bcrypt.compare(password, user.password))) {
    return true;
  }
  return false;
};

const sendEmailVerification = async (action, id, email, code) => {
  const message = `Click the link below to ${
    action === "register" ? "activate your account" : "reset your account"
  }:
  <br>
  ${process.env.CLIENT_URL}/${
    action === "register" ? "verify" : "new-password"
  }/${id}/${code}
  
  `;
  return await createEmail(
    process.env.MY_EMAIL || "",
    email,
    action === "register" ? "ACTIVATE ACCOUNT" : "RESET PASSWORD",
    message
  );
};

export {
  generateToken,
  generateCode,
  hashPassword,
  checkIdentifier,
  checkPassword,
  sendEmailVerification,
};
