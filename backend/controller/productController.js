export const getProducts = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "List of products",
    });
  } catch (error) {
    console.log("error while getting product list", error);
    res.status(401).send({
      success: false,
      message: "Unauthorized user",
    });
  }
};

export const createProduct = (req, res) => {
  res.send({
    sucess: true,
    message: "Product created successfully",
  });
};
