const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/ScrapOut", {
    useNewUrlParser: true,
  });
} catch (err) {
  console.log(err);
}

const user_db=require('../models/user/user_schema.js')

const publicKey = fs.readFileSync(
  path.join(__dirname, "..", "keys", "publickey.txt")
);

const userAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res.send({
      success: false,
      message: "access denied",
    });
  try {
    const verified = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    req.user = verified;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: "invalid token",
    });
  }
};

module.exports = userAuth;