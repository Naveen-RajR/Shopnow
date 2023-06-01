const cartSchema = require("../Model/cartModel");
const expressAsyncHandler = require("express-async-handler");

exports.cartProduct = expressAsyncHandler(async (req, res) => {
  const cartObject = req.body;
  console.log("this is backend", cartObject);

  let product = cartObject.products[0];

  let checkName = await cartSchema.findOne({ firstName: cartObject.firstName });
  // console.log("is name available", checkName);

  if (checkName !== null) {
    let updateCart = await cartSchema.findOneAndUpdate(
      { firstName: cartObject.firstName },
      { $push: { products: product } }
    );
    res.send({message:"cart updated",count:updateCart.length})
    // console.log(updateCart);
  } else {
    let newCart = await cartSchema.create(cartObject);
    // console.log(newCart);
    res.send({message:"cart created"})

  }

  // const cartObject=req.body;
  // console.log("this is backend", cartObject);

  // let checkId=await cartSchema.findOne({userId:cartObject.userId});
  // console.log("is id available", checkId)

  // if(checkId!==null){
  //   let updateCart=await cartSchema.findOneAndUpdate({userId:cartObject.userId},{$push:{products:product}})
  //   console.log(updateCart)
  // }
  // else{
  //   let newCart=await cartSchema.create(cartObject)
  //   console.log(newCart)
  // }
});

exports.getCartProducts = expressAsyncHandler(async (req, res) => {
  let firstName = req.params.firstName;
  // console.log("this is backend", firstName);

  let findItems = await cartSchema.findOne({firstName:firstName});

  // console.log("this is name", findItems);

 res.send({data:findItems})

  
});
