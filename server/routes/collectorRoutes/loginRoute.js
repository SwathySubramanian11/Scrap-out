const express = require("express");
const mongoose = require("mongoose");
const registerValidation = require("../../validation");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const router = express.Router();

try {
    mongoose.connect('mongodb://127.0.0.1:27017/ScrapOut',{useNewUrlParser:true});
  } catch (err) {
    console.log(err);
  }

const collector_db = require("../../models/collector/collector_schema");
const order_list_db = require("../../models/collector/list_schema");
const product_db = require("../../models/collector/product_schema");

//username
//password

router.post("/sign_up",async(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    const {error} = registerValidation(req.body);
    if(error){
        const messageWithoutQuotes = error.details[0].message.replaceAll('"',"");
        return res.status(400).send({
            success: false,
            message: messageWithoutQuotes,
        });
    }

    try{
        result = await collector_db.find({username:username});
        if(result.length!==0){
            res.status(400).send({
                success: false,
                message: "username already exist"
            });
        } else {
          const hashedPassword = bcrypt.hashSync(password, 10);
          const newUser = {
            username: username,
            password: hashedPassword,
            owner: req.body.name,
            shopname: req.body.shopname,
            password: password,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email
            };
        };
        try{
            let collector= await collector_db.insertMany(newCollector);
            let collector_id = collector[0].id;
            if(collector){
                try{
                    let order_list_info={
                        _id: collector_id,
                        shopname: req.body.shopname,
                        orders:{}
                        
                    };
                    let product_info={
                        _id: collector_id,
                        shopname: req.body.shopname,
                        e_waste:{},
                        paper:{},
                        plastic:{},
                        metal:{},
                        others:{}

                    };
                    await order_list_db.insertMany(order_list_info);
                    await product_db.insertMany(product_info);
                    res.status(200).send({
                        success: true,
                        collector_id: collector[0]._id,
                        username: username,
                        message: "user registered successfully",
                      });
                } catch(error){
                    console.log(error);
                    res.status(500).send({
                        success: false,
                        message: "error occured",
                    });
                }
            }
        } catch(error) {
            console.log(error);
        }
    } catch(error){
        console.log(error);
    }   
});

const privateKey = fs.readFileSync(
    path.join(__dirname, "..","..", "keys", "privateKey.txt")
  );

router.post("/sign_in",async(req,res)=>{
    try{
        collector=await collector_db.find({username: req.body.username});
        if(collector.length === 0){
            return res.status(400).send({
                sucess: false,
                message: "username doesn't exist",
            });
        }
        const validPass= bcrypt.compareSync(req.body.password);

        if(!validPass)
            return res.status(400).send({
                success: false,
                message: "password incorrect",
            });
        const payload = {
            collector_id:collector[0].id,
            username: req.body.username
        }
        const token= jwt.sign(payload,privateKey,{
            expiresIn: "12h",
            algorithm: "RS256",
        })
        console.log(token);

        res.status(200).send({
            success:true,
            message: "logged in",
            token: token,
        });
    } catch(error){
        console.log(error);
    }
});

module.exports=router;