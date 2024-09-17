import express from "express";
import userSchemaModel from "../models/userModel.js";

const productRoute = express.Router();

productRoute.get("/list", async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(404).send({
        success: false,
        message: "Please enter a token",
      });
    }

    const isValidUser = await userSchemaModel.findOne({ token: token });
    if (!isValidUser) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    res.json({
      success: true,
      message: "List of products",
    });
  } catch (error) {
    console.log("error while getting product list", error);
    res.send({
      success: false,
      message: "Failed to get product list",
    });
  }
});

export default productRoute;
