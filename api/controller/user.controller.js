import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
export const testRoute = (req, res) => {
  res.json({
    message: "Test Route",
  });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only update your own account!"));
  }
  try {
    if (req.body.password) {
      //hash the password using bcryptjs
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    //find id of user and update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          //...rest => this is also a way , but here every detail will be updated
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      //new help to get new information and not old
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
