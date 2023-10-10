const userModel=require('../Model/model');
const bcryptjs=require('bcryptjs')
const jwt =require ('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')



exports.register= expressAsyncHandler( async (req,res)=>{
    const {firstName,lastName,phoneNumber,country,password,email}=req.body;
    
    let findUser=await userModel.findOne({email})
    
    if(findUser!==null){
      res.send({message:"UserID already exist! Try Logging in!!"})
      
    }
       
    // sendTokenResponse(user,200,res)
    else{
      const user= await userModel.create({
          firstName,lastName,
          phoneNumber,country,password,email
      });
      const token=user.getSignedJwtToken()
      // console.log(token)
      res.send({message:"registration success",token:token,user:user})
      // console.log(message)
    }
})

exports.login= expressAsyncHandler( async (req,res)=>{
  let credObject=req.body;

  let userData=await userModel.findOne({email:credObject.email})
  // console.log(userData)
  if(userData===null){
    res.send({message:"Invalid Email address"})
  }
  else{
    let status=await bcryptjs.compare(credObject.password,userData.password);

    //password not match
    if(status==false){
      res.send({message:"Invaild password"})
    }
    else{
      let signedJwtToken=jwt.sign({id:this._id},process.env.SECRET,{expiresIn:'30d'})

      res.send({message:"success Login",token:signedJwtToken, user:userData})
    }
  }

  //model

  // const {email,password}=req.body;

  // const user=await userModel.findOne({email}).select("+password");

  // // not found details
  // if(!email || !password){
  //   res.json({message:"Invalid Crenditals"})
  // }
  // //check for user
  // // if(!user){
  // //   res.json({message:"Invalid Crenditals"})
  // // }

  
  // let isMatch=await user.matchPassword(password)
  
  // if(!isMatch){
  //     res.json({message:"Invalid Crenditals"})
  // }
  // const token=user.getSignedJwtToken();
  // console.log({"token":token})
  //  return res.json({message:"success Login",token,user:user})


})

exports.editUserDetail=expressAsyncHandler(async (req,res)=>{
  // let findUser=await userModel.findById(req.params.id)
  // console.log(findUser)
 
  const updatedOne=await userModel.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
  })
  // delete updatedOne.password;

  if(!updatedOne){
    return res.send({message:"error acquired"})
  }
  else{
    res.send({data:updatedOne})
  }
  console.log(updatedOne)
})