import mongoose from "mongoose";

// const address = new mongoose.Schema({})
const address = {
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
    default: "-",
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pinCode: {
    type: String,
    required: true,
  },
  _id: false,
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
    default: "-",
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: address,
    required: true,
  },
  token: {
    type: String,
    required: false,
    default: "",
  },
});

const userSchemaModel = mongoose.model("users", userSchema);

export default userSchemaModel;
