const mongoose=require('mongoose');

const favSchema=new mongoose.Schema({
    _userid:String,
    products:{
        type:Array
    }
})


module.exports=mongoose.model('favouriteCollection',favSchema)