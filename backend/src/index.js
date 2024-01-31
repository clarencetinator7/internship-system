import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";

import { authRoute } from "./routes/auth.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
const upload = multer();

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

app.use("/api/auth", authRoute);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});
