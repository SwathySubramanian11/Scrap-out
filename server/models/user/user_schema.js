const mongoose=require('mongoose')

const schema=mongoose.Schema({
    "username":{
        type:String,
        required:true
    },
    "password":{
        type:String,
        required:true
    },
    "name":{
        type:String,
        required:true
    },
    "phone":{
        type:String,
        required:true
    },
    "email":{
        type:String,
        required:true
    },
    "address":{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('user_db',schema)