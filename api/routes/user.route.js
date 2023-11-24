import express from "express";
import {
  testRoute,
  updateUser,
  deleteUser,
  getUserListings,
} from "../controller/user.controller.js";

import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

//http requests
router.get("/test", testRoute);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listing/:id", verifyToken, getUserListings);

export default router;
