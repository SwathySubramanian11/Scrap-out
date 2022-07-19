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
    },
    "phone":{
        type:String,
    },
    "email":{
        type:String,
    },
    "address":{
        type:String,
    }
})

module.exports=mongoose.model('user_db',schema)