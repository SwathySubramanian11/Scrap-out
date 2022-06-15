const mongoose=require('mongoose')

const schema=mongoose.Schema({
    "shopname":{
        type:String,
        required:true
    },
})

module.exports=mongoose.model('product_db',schema)