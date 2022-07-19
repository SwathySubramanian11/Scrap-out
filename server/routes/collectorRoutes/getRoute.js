const express = require("express");
const mongoose = require("mongoose");
const auth = require("../../middleware/collectorAuth");

const router=express.Router()

try {
  mongoose.connect("mongodb://127.0.0.1:27017/ScrapOut", {
    useNewUrlParser: true,
  });
} catch (err) {
  console.log(err);
}

const collector_db=require('../../models/collector/collector_schema')
const list_db=require('../../models/collector/list_schema')
const product_db=require('../../models/collector/product_schema')


router.get('/get_account',auth,async(req,res)=>{
  try{
    result=await collector_db.find({_id:req.collector.collector_id})
    res.json(result[0])
  }catch(error){
    res.status(500).send({
      action:"failed to get collector account information",
      success:false,
    })
    return ;
  }
})

router.get('/get_orders',auth,async(req,res)=>{
    try{
      result=await list_db.find({_id:req.collector.collector_id})
      res.json(result[0])
    }catch(error){
      res.status(500).send({
        action:"failed to get order list information",
        success:false,
      })
      return ;
    }
  })

router.get('/get_products',auth,async(req,res)=>{
    try{
      result=await product_db.find({_id:req.collector.collector_id})
      res.json(result[0])
    }catch(error){
      res.status(500).send({
        action:"failed to get product information",
        success:false,
      })
      return ;
    }
  })

module.exports=router;