import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import productRoute from "./routes/productRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const port = process.env.PORT || 10000;
dotenv.config();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
  .then(() => console.log("Connected to Database."))
  .catch((error) => console.log("Unable to connect to Database", error));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
