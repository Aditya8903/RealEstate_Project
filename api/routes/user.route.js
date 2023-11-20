import express from "express";
import { testRoute } from "../controller/user.controller.js";

const router = express.Router();

//http requests
router.get("/test", testRoute);

export default router;
