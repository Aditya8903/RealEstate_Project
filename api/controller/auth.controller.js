import bcrypt from "bcrypt";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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
      return next(errorHandler(400, "User Already Exists"));
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    }
    //comparing password from request body with validUser password
    //using bcryptjs for comparison as password is hashed
    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials! Email not registered"));
    }
    //generate token using jwt
    //jwt.sign(unique id of user like "id here",secret)
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    //separating password and rest information
    const { password: pass, ...rest } = validUser._doc; //._doc was containing password
    //store token in cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
      })
      .status(200)
      .json(rest); ///return rest in json means return all except password as mentioned above
  } catch (error) {
    next(error);
  }
};
