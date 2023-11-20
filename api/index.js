import express from "express";
import { connect } from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
dotenv.config();

//app initialization
const app = express();

const PORT = process.env.PORT || 3000;

//db connection
connect();
app.listen(PORT, () => {
  console.log(`Server  running at ${PORT}`);
});

//route mounting
app.use("/api/user", userRouter);
