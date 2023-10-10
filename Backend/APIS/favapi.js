const express = require("express");
const favApp = express.Router();
const {getFavProducts,addedToFavourite}=require('../Controller/favController')

favApp.post("/createFav", addedToFavourite);
favApp.get("/:id", getFavProducts);



module.exports=favApp;