const mongoose=require('mongoose');
const productSchema=new mongoose.Schema({
    productId:{
        type:String
    },
    productName:{
        type:String
    },
    description:{
        type:String,
    },
    productPrice:{
        type:Number
    },
    productRating:{
        type:Number
    },
    productImage:{
        type:String

    }
})

module.exports=mongoose.model('products',productSchema)