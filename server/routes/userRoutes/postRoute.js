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

router.post('/edit_order',auth,async(req,res)=>{
  let username=req.user.username
  try{
    order=await order_db.find({username:username})
    user_info=await user_db.find({username:username})    
    if(order.length===0){
      let item={}
      item.key=req.body.category
      item[req.body.category]=req.body.price
      new_order={
        _id:req.user.user_id,
        username:username,
        shopname:req.body.shopname,
        address:user_info[0].address,
        items:[item]
      }

      try{
        order=await order_db.insertMany(new_order);  
        res.status(200).send({
          action:"newly added information",
          success:true
        })
      }
      catch(error){
        console.log(error)
        res.status(500).send({
          action:"failed to add information",
          success:false
        })
      }
    }
    else{
      console.log(order)

      let item={}
      item.key=req.body.category
      item[req.body.category]=req.body.price 

      order[0].items.push(item)

      console.log(order)
      new_order=order

      result=await order_db.replaceOne({username:username},order[0])
      res.status(200).send({
        action:"edited information",
        success:true
      })
    }

  }catch(error){
    console.log(error)
    res.status(500).send({
      action:"failed to add information",
      success:false
    })
  }
})



module.exports=router;