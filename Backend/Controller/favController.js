const favSchema = require("../Model/Fav");
const expressAsyncHandler = require("express-async-handler");

//addto favourite
exports.addedToFavourite = expressAsyncHandler(async (req, res) => {
  let favObject = req.body;
  let favProduct = favObject.products[0];

  let checkId = await favSchema.findOne({ _userid: favObject._userid });
  // console.log(checkId, "idcheck for add to favourite");
  if (checkId !== null) {
    let updateFavourite = await favSchema.findOneAndUpdate(
      { _userid: favObject._userid },
      { $push: { products: favProduct } }
    );
    // console.log(updateFavourite, "insert if id exist");
    res.send({
      message: "updated Favourite",
      count: updateFavourite.length,
    });
  } else {
    let newFavourite = await favSchema.create(favObject);
    // console.log(newFavourite, "newly fav object");
    res.send({ message: "Favourite Created" });
  }
});

exports.getFavProducts = expressAsyncHandler(async (req, res) => {
  let id = req.params.id;
  // console.log("this is hello", id);

  let findItems = await favSchema.find({_userid:id}).select('products').exec()

  // console.log("this is name", findItems);

  res.send({ data: findItems });
});
