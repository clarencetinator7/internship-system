import * as jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import { pool } from "../config/db.config.js";
const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(403);
    throw new Error("Not authorized. No token");
  } else {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await pool.query("SELECT * FROM users WHERE userId = ?", [
      data.id,
    ]);
    req.user = rows[0];
    next();
  }
});

export { authMiddleware };
