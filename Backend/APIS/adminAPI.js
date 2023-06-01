const express=require('express');
const adminApp=express.Router();
const {adminLogin,createProduct, getProducts,editProducts, deleteProduct}=require('../Controller/adminController')


//admin Login
adminApp.post('/login',adminLogin)

//createproduct
adminApp.post('/createProduct',createProduct)


adminApp.get('/getProducts',getProducts)

//edit
adminApp.put("/:id",editProducts)


adminApp.delete('/:id',deleteProduct)



module.exports=adminApp