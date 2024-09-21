import { ProductModel } from "../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const pageSize = req.query.pageSize || 10;
    const pageNo = req.query.pageNo || 1;
    const minPrice = req.query.minPrice || 0;
    const sortBy = req.query.sort == "asc" ? 1 : -1;
    const responseProducts = await ProductModel.find({
      price: {
        $lte: minPrice,
      },
    })
      .sort({ price: sortBy })
      .limit(pageSize)
      .skip((pageNo - 1) * pageSize);

    return res.json({
      success: true,
      message: "List of products",
      data: responseProducts,
    });
  } catch (error) {
    console.log("error while getting product list", error);
    return res.status(401).send({
      success: false,
      message: "Unauthorized user (getProducts)",
    });
  }
};

export const createProduct = async (req, res) => {
  const productsData = req.body;

  const newlyInsertedProduct = await ProductModel.create(productsData);
  console.log(newlyInsertedProduct);
  return res.send({
    sucess: true,
    message: "Product inserted successfully",
    data: newlyInsertedProduct,
  });
};

export const editProduct = async (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = await ProductModel.findByIdAndUpdate(productId, {
    $set: req.body,
  });
  console.log(updatedProduct);

  return res.send({
    success: false,
    message: "Product updated successfully",
    data: updatedProduct,
  });
};
