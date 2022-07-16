const express=require('express')
const mongoose=require('mongoose')
const app=express()
const fs=require('fs')
const collectorLoginRoute=require('./routes/collectorRoutes/loginRoute')
const expressMongoDb=require('express-mongo-db')
const collectorAuth=require('./middleware/collectorAuth')

try{
  mongoose.connect('mongodb://127.0.0.1:27017/ScrapOut',{useNewUrlParser:true})
}catch(err){
  console.log(err)
}

const user_db=require('./models/user/user_schema')
const collector_db=require('./models/collector/collector_schema')
// change
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/coll_login',collectorLoginRoute);

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