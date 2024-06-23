import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUser, registerUser } from "../service/userService.js";
import AppSuccess from "../utils/response-handlers/AppSuccess.js";
import AppError from "../utils/response-handlers/AppError.js";

export const register = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser({
      username,
      password: hashedPassword,
    });

    return next(
      new AppSuccess(
        { username: newUser.username },
        "User registered successfully",
        201
      )
    );
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await findUser({ username });

    if (!user) return next(new AppError("User not found", 404));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new AppError("Invalid credentials", 400));

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false, // false for development only
    });

    return next(
      new AppSuccess({ user, token }, "User logged in successfully", 200)
    );
  } catch (error) {
    return next(new AppError(error.message, 400));
  }
};
