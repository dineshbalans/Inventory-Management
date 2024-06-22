import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import globalResponseController from "./utils/response-handlers/GlobalResponseController.js";

const app = express();
app.use(bodyParser.json());

// const DB_URL = "mongodb://localhost:27017/inventory";
const DB_URL =
  "mongodb+srv://dineshbalansrinivasan:dEhzlFoCnGA6S6Aw@cluster0.vvwnygw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/v1/user", userRouter);

// app.use(globalResponseController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// dEhzlFoCnGA6S6Aw;
// dineshbalansrinivasan;
