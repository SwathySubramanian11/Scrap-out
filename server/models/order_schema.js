const mongoose=require('mongoose')

const schema=mongoose.Schema({
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
  "proof":{
    type:Image,
    required:true
  }
})

module.exports=mongoose.model('order_db',schema)