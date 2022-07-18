const express=require('express')
const mongoose=require('mongoose')
const app=express()
const fs=require('fs')
const userLoginRoute=require('./routes/userRoutes/loginRoute')
const expressMongoDb=require('express-mongo-db')
//const auth=require('./middleware/userAuth')

try{
  mongoose.connect('mongodb://127.0.0.1:27017/ScrapOut',{useNewUrlParser:true})
}catch(err){
  console.log(err)
}

const user_db=require('./models/user/user_schema')

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/userlogin',userLoginRoute);

app.get('/api/get_data', async (req,res)=>{
  try{
      result=await Database.find({_id:req.user.user_id})
      res.json(result)
  }
  catch(error){
      res.status(500).send({
          success:false
      })
  }
})

app.listen(5000,()=>{
  console.log('server listening')
})