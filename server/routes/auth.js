const express=require('express')
const LoginRoutes=require('./LoginRoutes')
const fs=require('fs')
const path=require('path')

module.exports=(req,res,next)=>{
  const authHeader=req.header('Authorization')
  console.log(authHeader)
  const token=authHeader && authHeader.split(' ')[1]
  if(!token) return res.send({
      success:false,
      message:"access denied"
  })
  try{
      const verified=jwt.verify(token, publicKey,{algorithms: ["RS256"]})
      req.user=verified
      next()
  }catch(err){
      res.send({
          success:false,
          message:"Invalid token"
      })
  }
}

