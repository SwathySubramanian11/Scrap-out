const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const fs=require('fs')
const registerValidation=require('../validation')
const path=require('path')

const router=express.Router()

try{
  mongoose.connect('mongodb://127.0.0.1:27017/ScrapOut',{useNewUrlParser:true})
}catch(err){
  console.log(err)
}
const user_db=require('../models/user_schema')

let privateKey=null

try{
   privateKey=fs.readFileSync(path.join(__dirname,'privateKey.txt'))
}
catch(err){
    console.log(err)
}

router.post('/sign_up', async (req,res)=>{
  let username=req.body.username
  let password=req.body.password 
  const {error}=registerValidation(req.body)
  console.log(1)
  if(error) {
      const messageWithoutQuotes=error.details[0].message.replaceAll('\"','')       
      return res.status(400).send({
          success:false,
          message:messageWithoutQuotes
      })    
  }
  
  try{
      console.log(user_db[0])
      result=await user_db.find({"username":username})
      if(result.length!==0){
        console.log(3)
          res.status(400).send({
              success:false, 
              message:"username already exist"
          })
      }
      else{
        console.log(4)
          const hashedPassword = bcrypt.hashSync(password, 10);
          newUser={
              "username":username,
              "password":hashedPassword
          }
          try{
            console.log(5)
              let user=await user_db.insertMany(newUser)
              console.log(user)
              if(user){
                console.log(6)
                  res.status(200).send({
                      success:true,
                      user_id:user[0]._id,
                      username:username,
                      message:"user registered successfully"
                  })
              }
          }catch(err){
              console.log(err)
          }     
      }
  }
  catch(err){
      console.log(error)
  }
})

router.post('/sign_in',async (req,res)=>{
  try{
      user=await user_db.find({"username":req.body.username})
      if(user.length===0)
          return res.status(400).send({
              success:false,
              message:"username doesnt exist"
          })
      const validPass=bcrypt.compareSync(req.body.password, user[0].password)
      
      if(!validPass)
          return res.status(400).send({
              success:false,
              message:"Incorrect password"
          })
      const payload={
          user_id:user[0]._id,
          username:req.body.username
      }
      const token=jwt.sign(payload,privateKey,{expiresIn:"12h",algorithm: "RS256"})
      
      res.status(200).send({
          success:true,
          message:"logged in",
          token:token
      })
  }
  catch(err){
      console.log(err)
  }
})

module.exports=router