import express from "express";

import {
  createProduct,
  editProduct,
  getProducts,
} from "../controller/productController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const productRoute = express.Router();

productRoute.get("/list", authMiddleware, getProducts);

productRoute.post(
  "/create",
  authMiddleware,
  roleMiddleware(["SELLER", "ADMIN"]),
  createProduct
);

productRoute.post(
  "/edit/:productId",
  authMiddleware,
  roleMiddleware(["SELLER", "ADMIN"]),
  editProduct
);

export default productRoute;
