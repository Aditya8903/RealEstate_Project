import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    console.log("No token found");
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    res.clearCookie("access_token");

    if (err) {
      console.error("Token verification error:", err);
      return next(errorHandler(403, "Forbidden"));
    }

    console.log("Decoded User:", user);

    req.user = user;
    next();
  });
};
