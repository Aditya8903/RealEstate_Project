import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Test route
export const testRoute = (req, res) => {
  res.json({
    message: "Test Route",
  });
};

// Update user information
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    // Check if the user is trying to update their own account
    return next(errorHandler(401, "You can only update your own account!"));
  }

  try {
    if (req.body.password) {
      // Hash the password using bcryptjs
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Find user by ID and update
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      // Set { new: true } to get the updated user information
      { new: true }
    );

    // Exclude password from the response
    const { password, ...rest } = updatedUser._doc;

    // Send the updated user information in the response
    res.status(200).json(rest);
  } catch (error) {
    // Handle errors
    next(error);
  }
};

// Delete user account
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    // Check if the user is trying to delete their own account
    return next(errorHandler(401, "You can only delete your own account!"));
  }

  try {
    // Find user by ID and delete
    await User.findByIdAndDelete(req.params.id);

    // Send success message in the response
    res
      .status(200)
      .json({ success: true, message: "User has been deleted successfully" });
  } catch (error) {
    // Handle errors
    next(error);
  }
};
