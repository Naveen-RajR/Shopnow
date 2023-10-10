const cartSchema = require("../Model/cartModel");
const expressAsyncHandler = require("express-async-handler");


//addt to cart
exports.cartProduct = expressAsyncHandler(async (req, res) => {
  const cartObject = req.body;

  let product = cartObject.products[0];

  let checkName = await cartSchema.findOne({ firstName: cartObject.firstName });

  if (checkName !== null) {
    let updateCart = await cartSchema.findOneAndUpdate(
      { firstName: cartObject.firstName },
      { $push: { products: product } }
    );
    res.send({ message: "cart updated", count: updateCart.length });
  } else {
    let newCart = await cartSchema.create(cartObject);
    res.send({ message: "cart created" });
  }

});

//get from cart
exports.getCartProducts = expressAsyncHandler(async (req, res) => {
  let firstName = req.params.firstName;
  // console.log("this is firstname of backend", firstName);

  let findItems = await cartSchema.findOne({ firstName: firstName });


  res.send({ data: findItems });
});

