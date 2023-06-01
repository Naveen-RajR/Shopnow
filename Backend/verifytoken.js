// const jwt= require('jsonwebtoken');

// exports.protectRoute=(req,res,next)=>{
//     console.log(req.headers)
//     let bearerToken= req.headers.authorization;
//     if(bearerToken==undefined){
//         res.send({message:"you not authorized to use"});
//     }
//     else{
//         let token=bearerToken.split("")[1];

//         jwt.verify(token,"dflkjkldjkfjdj",(err,decodedToken)=>{
//             if(err){
//                 res.send({message:"Session expired..try to relogin"})
//             }
//             else{
//                 next()
//             }
//         })
//     }
// }