import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";

import { authRoute } from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const PORT = process.env.PORT || 3000;

const app = express();
const upload = multer();
dotenv.config();

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(upload.none());

app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRoute);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
