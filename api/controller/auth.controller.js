import bcrypt from "bcrypt";
import User from "../models/user.model.js";
// localhost:4000/api/auth/signup

export const signup = async (req, res, next) => {
  try {
    // get data
    const { username, email, password } = req.body;

    // check if user already exists
    if (!username || !email || !password) {
      throw new Error("Fill required details");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Secure the password
    let hashedPass;
    try {
      hashedPass = await bcrypt.hash(password, 10);
    } catch (err) {
      return next(err);
    }

    // create user
    const user = await User.create({
      username,
      email,
      password: hashedPass,
    });
    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
