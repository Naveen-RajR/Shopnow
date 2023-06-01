const mongoose=require('mongoose');
const cartSchema= new mongoose.Schema({

    firstName:String,
    products:{
        type:Array
    }
   
})

module.exports=mongoose.model('cartCollection',cartSchema)