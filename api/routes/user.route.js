import express from "express";
import { testRoute, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

//http requests
router.get("/test", testRoute);
router.post("/update/:id", verifyToken, updateUser);

export default router;
