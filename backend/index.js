import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import productRoute from "./routes/productRoute.js";
const app = express();

const port = process.env.PORT || 10000;
dotenv.config();

app.use(express.json());

mongoose
  .connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
  .then(() => console.log("Connected to Database."))
  .catch((error) => console.log("Unable to connect to Database", error));

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
