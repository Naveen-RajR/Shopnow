const jwt = require("jsonwebtoken");
const productModel = require("../Model/productModel");

exports.adminLogin = (req, res) => {
  let adminObj = req.body;
  // console.log(adminObj)

  if (adminObj.email !== "admin@gmail.com") {
    res.send({ message: "Invalid username" });
  } else if (adminObj.password !== "admin123") {
    res.send({ message: "Invalid password" });
  } else {
    let signedToken = jwt.sign({ email: adminObj.email }, process.env.SECRET , {
      expiresIn: 10,
    });
    res.send({ message: "login Success", token: signedToken, admin: "admin" });
  }
};

exports.createProduct = async (req, res) => {
  let productObject = req.body;

  let productidExist = await productModel.findOne({
    productId: productObject.productId,
  });

  if (productidExist !== null) {
    res.send({ message: "productID exist" });
  } else {
    let newProduct = await productModel.create(productObject);
    res.send({ message: "Product added", product: newProduct });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const getProduct = await productModel.find();
    res.send({
      message: "Got all products",
      count: getProduct.length,
      data: getProduct,
    });
  } catch (error) {
    res.send(error.message);
    // console.log(error.message);
  }
};

exports.editProducts = async (req, res) => {
  const updateProduct = await productModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    //   runValidators: true,
    }
  );
  if (!updateProduct) {
    return res.send(error.message);
  }
  res.send({
    message: "updated",
    data: "updatedData",
  });
};

exports.deleteProduct = async (req, res) => {
  // console.log(req.params.id);
  const deleteOne = await productModel.findByIdAndDelete(req.params.id);
  // console.log(deleteOne);
  if (!deleteOne) {
    return res.send(error.message);
  }
  res.send({
    message: "deleted",
  });
};
