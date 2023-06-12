const express=require('express');
const router=express.Router();
const {register,login,editUserDetail}=require('../Controller/controll')
// const {protectRoute}=require('../verifytoken')


router.post('/register',register)
router.post('/login',login)
router.put('/:id',editUserDetail)


module.exports=router