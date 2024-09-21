import userSchemaModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const user = await userSchemaModel.findOne({ email: data.email });
  if (user) {
    return res.status(409).json({
      sucess: false,
      message: "User already exists",
    });
  }
  const salt = bcrypt.genSaltSync(10);

  const hashedPassword = bcrypt.hashSync(data.password, salt);
  const response = await userSchemaModel.create({
    ...data,
    password: hashedPassword,
    role: "CUSTOMER",
  });
  // console.log(response);

  res.status(201).json({
    sucess: true,
    message: "User registered successfully",
  });
};

export const login = async (req, res) => {
  // login api called
  // checking if user exists or not
  try {
    const user = await userSchemaModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "User not found",
      });
    }

    const isPasswordSame = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordSame) {
      return res.status(404).json({
        sucess: false,
        message: "Password is incorrect, please enter correct password",
      });
    }

    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const expiryTimeInSeconds = currentTimeInSeconds + 3600;

    const jwtPayload = {
      userId: user._id,
      role: user.role,
      mobileNo: user.mobileNumber,
      email: user.email,
      exp: expiryTimeInSeconds,
    };

    const token = jwt.sign(jwtPayload, "my_secret_key");
    // const token = "sdasdfklajsdlkfaj;s";
    const userdata = await userSchemaModel.findByIdAndUpdate(user._id, {
      $set: { token },
    });
    // console.log("userdata", userdata);

    // res.json({
    //   sucess: true,
    //   message: "Logged in successfully",
    //   token: token,
    // });

    res
      .cookie("auth_token", token, {
        httpOnly: true,
        secure: false, //as we are working with localhost, which runs on http, not on https
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({
        message: "Login Successful",
      });
  } catch (error) {
    console.log("Unable to login user", error);
  }
};
