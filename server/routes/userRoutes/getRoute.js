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
const collector_db=require('../../models/collector/collector_schema')
const list_db=require('../../models/collector/list_schema')
const product_db=require('../../models/collector/product_schema')


//related to user for the user by the user. 
//this is just for showing on our page

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

//related to collector for the user page
//for the purpose of mapping onto user page

router.post('/get_collectors',auth,async (req,res)=>{
  let collector=req.body.collector
  try{
    result=await collector_db.find({shopname:collector})
    res.json(result[0])
  }catch(error){
    res.status(500).send({
      action:"failed to get information",
      success:false
    })
    return;
  }
})

router.get('/get_products',auth,async (req,res)=>{
  try{
    result=await product_db.find({})
    res.json(result)
  }catch(error){
    res.status(500).send({
      action:"failed to get information",
      success:false
    })
    return;
  }
})

//these get routes will give the user product details.

router.post('/get_selected_product',auth,async(req,res)=>{
  let selected=req.body.selected
  try{
    result=await product_db.find({selected})
    console.log(result)
    res.json(result)
  }
  catch(error){
    res.status(500).send({
      action:"failed to get information",
      success:false
    })
    return
  }
})

module.exports=router;