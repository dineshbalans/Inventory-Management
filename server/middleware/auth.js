import jwt from "jsonwebtoken";
import AppError from "../utils/response-handlers/AppError.js";

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  // with cookie
  // const { jwt: token } = req.cookies;
  if (!token) return next(new AppError("No token, authorization denied", 401));

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

export default auth;
