const mongoose=require('mongoose')

const schema=mongoose.Schema({
    "shopname":{
        type:String,
        required:true
    },
    "e_waste":{
      type:Object
    },
    "Paper":{
      type:Object
    },
    "Plastic":{
      type:Object
    },
    "Metal":{
      type:Object
    },
    "Others":{
      type:Object
    }
})

module.exports=mongoose.model('product_db',schema)