import userSchemaModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  // const token = req.body.token
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    // console.log(token);

    // Check if token is provided or not
    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Please enter a Token",
      });
    }

    // check if token is same as we generated earlier using secret key
    jwt.verify(token, "my_secret_key");

    // to decode the encoded data during token generation
    const tokenData = jwt.decode(token);

    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

    // check if token is expired or not
    if (currentTimeInSeconds > tokenData.exp) {
      // if we are inside if block that means token is expired
      return res.status(401).send({
        success: false,
        message: "Token is expired, please login again",
      });
    }

    // check if user details is valid or not from database
    const checkUserDetails = await userSchemaModel.findById(tokenData.userId);
    if (!checkUserDetails) {
      return res.status(401).send({
        success: false,
        message: "User not found.",
      });
    }
    // passing user data from auth middleware to role middleware
    req.user = checkUserDetails;

    // if all checks passed, then we allow the user to access the protected route
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized user (catch)" });
    return;
  }
};
