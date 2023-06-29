const express=require('express');
const adminApp=express.Router();
const multer=require('multer');
const dotenv=require('dotenv')
dotenv.config()
const cloudinary=require('cloudinary').v2
const {CloudinaryStorage}=require('multer-storage-cloudinary');

cloudinary.config({ 
    cloud_name: 'storage01', 
    api_key: process.env.cloudinary_ApiKey, 
    api_secret: process.env.cloudinary_Api_Secret
});

const cloudStorage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"shopnow",
        public_id:(req,file)=>file.filename + "-" + Date.now()
    }
})

const {adminLogin,createProduct, getProducts,editProducts, deleteProduct}=require('../Controller/adminController')



const upload=multer({storage:cloudStorage})

//admin Login
adminApp.post('/login',adminLogin)

//createproduct
adminApp.post('/createProduct',upload.single("productImage"),createProduct)

//get
adminApp.get('/getProducts',getProducts)

//edit
adminApp.put("/:id",editProducts)


adminApp.delete('/:id',deleteProduct)



module.exports=adminApp