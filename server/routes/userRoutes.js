import express from "express";
import {
  login,
  logout,
  refresh,
  register,
} from "../controllers/UserController.js";
import auth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/refresh", auth, refresh);

export default userRouter;
// module.exports = userRouter;
