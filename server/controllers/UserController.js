import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUser, registerUser } from "../service/userService.js";
import AppSuccess from "../utils/response-handlers/AppSuccess.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await registerUser({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const user = await findUser({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });
    res.json({ token });
    // return next(new AppSuccess({ user, token }, "User logged in successfully", 200));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
