const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const fs=require('fs')

const router=express.Router()



module.exports=router