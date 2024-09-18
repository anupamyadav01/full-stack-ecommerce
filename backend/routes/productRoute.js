import express from "express";

import { createProduct, getProducts } from "../controller/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const productRoute = express.Router();

productRoute.get("/list", authMiddleware, getProducts);

productRoute.post("/create", authMiddleware, createProduct);

export default productRoute;
