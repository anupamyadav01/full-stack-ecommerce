import userSchemaModel from "../models/userModel.js";
import { v4 as uuid } from "uuid";

export const signup = async (req, res) => {
  const data = req.body;
  console.log(data);

  const response = await userSchemaModel.create(data);
  console.log(response);

  res.json({
    sucess: true,
    message: "User registered successfully",
  });
};

export const login = async (req, res) => {
  // checking if user exists or not
  try {
    const user = await userSchemaModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "User not found",
      });
    }

    if (user.password !== req.body.password) {
      return res.status(404).json({
        sucess: false,
        message: "Password is incorrect, please enter correct password",
      });
    }

    const token = uuid();
    const userdata = await userSchemaModel.findByIdAndUpdate(user._id, {
      $set: { token },
    });
    console.log("userdata", userdata);

    res.json({
      sucess: true,
      message: "Logged in successfully",
      token: token,
    });
  } catch (error) {
    console.log("Unable to login user", error);
  }
};
