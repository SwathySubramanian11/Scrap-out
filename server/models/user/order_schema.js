const mongoose=require('mongoose')

const schema=mongoose.Schema({
  "username":{
    type:String,
    required:true
  },
  "shopname":{
    type:String,
    required:true
  },
  "address":{
    type:String,
    required:true
  },
  "items":{
    type:Object,
    required:true
  },
})

module.exports=mongoose.model('order_db',schema)