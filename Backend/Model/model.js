const mongoose=require('mongoose');
const schema=mongoose.Schema;
const bcryptjs=require('bcryptjs')
const jwt = require ('jsonwebtoken')

const userSchema=new schema({
    firstName:{
        type:String,
        requied:true,
        min:3
    },
    lastName:{
        type:String,
        requied:true,
        min:3
    },
    // dob:Date,
    phoneNumber:{
        type:Number,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true
    },
    country:String,
    password:{
        type:String,
        min:4,
        required:true,
        // select:false
    }
})

userSchema.pre('save', async function(next){
    const salt=await bcryptjs.genSalt(7)
    this.password=await bcryptjs.hash(this.password, salt)
})

userSchema.methods.getSignedJwtToken=function(){
    return jwt.sign({id:this._id},"dflkjkldjkfjdj",{expiresIn:10})
}

// // user entered password to hash password
// userSchema.methods.matchPassword=async function(enteredPassword){
//     return await bcryptjs.compare(enteredPassword,this.password);

// };



module.exports=mongoose.model('users',userSchema)