const mongoose=require('mongoose')

const schema=mongoose.Schema({
    "owner":{
      type:String,
    },
    "shopname":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "address":{
        type:String,
    },
    "phone":{
        type:String,
    },
    "email":{
        type:String,
    }
})

module.exports=mongoose.model('collector_db',schema)