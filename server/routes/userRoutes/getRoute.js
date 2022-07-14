const express = require("express");
const mongoose = require("mongoose");
const auth = require("../../middleware/userAuth");

const router=express.Router()

try {
  mongoose.connect("mongodb://127.0.0.1:27017/ScrapOut", {
    useNewUrlParser: true,
  });
} catch (err) {
  console.log(err);
}

const user_db=require('../../models/user/user_schema')
const order_db=require('../../models/user/order_schema')

router.get('/get_account',auth,async(req,res)=>{
  try{
    result=await user_db.find({_id:req.user.user_id})
    res.json(result[0])
  }catch(error){
    res.status(500).send({
      action:"failed to get account information",
      success:false,
    })
    return ;
  }
})

router.get('/get_order',auth, async (req,res)=>{
  try{
    result=await order_db.find({_id:req.user.user_id})
    res.json(result[0])
  }catch(error){
    res.status(500).send({
      action:"failed to get account information",
      success:false,
    })
    return ;
  }
})

module.exports=router;