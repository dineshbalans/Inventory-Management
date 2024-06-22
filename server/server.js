// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const userRouter = require("./routes/userRoutes");
// const globalResponseController = require("./utils/response-handlers/GlobalResponseController");

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes";
import globalResponseController from "./utils/response-handlers/GlobalResponseController";


const app = express();
app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/v1/user", userRouter);

// app.use(globalResponseController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
