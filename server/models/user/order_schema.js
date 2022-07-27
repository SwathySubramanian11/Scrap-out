const mongoose=require('mongoose')

const schema=mongoose.Schema({
  "username":{
    type:String,
    required:true
  },
  "shopname":{
    type:String,
  },
  "address":{
    type:String,
  },
  "items":[{}],
})

module.exports=mongoose.model('order_db',schema)