const express=require('express');
const cartApp=express.Router()
const {cartProduct,getCartProducts}=require('../Controller/cartController')

cartApp.post('/createCart',cartProduct)
cartApp.get('/:firstName',getCartProducts)


module.exports=cartApp