import express from "express";
import { connect } from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

//app initialization
const app = express();

const PORT = process.env.PORT || 3000;

//db connection
connect();

app.listen(PORT, () => {
  console.log(`Server  running at ${PORT}`);
});

//middleware
app.use(express.json());

//route mounting
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
