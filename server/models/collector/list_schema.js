const mongoose=require('mongoose')

const schema=mongoose.Schema({
    "shopname":{
      type:String,
      required:true
    },
    "orders":[{
      type:Object
    }]
})

module.exports=mongoose.model('list_db',schema)

/* 
  [
    shopname,
    orders:{
      order1:{
        username,
        items and price
        date
      }
    }
  ]
*/