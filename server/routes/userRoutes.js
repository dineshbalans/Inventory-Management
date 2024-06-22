// const express = require("express");
// const userRouter = express.Router();
// const userController = require("../controllers/UserController");

import express from "express";
import userController from "../controllers/UserController";
const userRouter = express.Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);

export default userRouter;
// module.exports = userRouter;
