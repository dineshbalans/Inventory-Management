import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userRouter from "./routes/userRoutes.js";
import globalResponseController from "./utils/response-handlers/GlobalResponseController.js";
import productRouter from "./routes/productRoutes.js";
import invoiceRouter from "./routes/invoiceRouter.js";
import auth from "./middleware/auth.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());

// Local MongoDB URL
// const DB_URL = "mongodb://localhost:27017/inventory";

// Cloud MongoDB URL
const DB_URL =
  "mongodb+srv://dineshbalansrinivasan:dEhzlFoCnGA6S6Aw@cluster0.vvwnygw.mongodb.net/Inventory?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(cookieParser());
// CORS configuration
const allowedOrigins = [
  "https://inventory-management-trga.onrender.com",
  "http://localhost:5000",
  "http://localhost:5173",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", auth, productRouter);
app.use("/api/v1/invoice", auth, invoiceRouter);

app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

app.use(globalResponseController);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
