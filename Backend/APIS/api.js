const express=require('express');
const router=express.Router();
const {register,login}=require('../Controller/controll')
const {protectRoute}=require('../verifytoken')


router.post('/register',register)
router.post('/login',login)



module.exports=router