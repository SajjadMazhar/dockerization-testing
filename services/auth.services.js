const jwt = require('jsonwebtoken')
require("dotenv").config({path:'../.env'})

exports.createToken = (id, ttx='24h')=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:ttx})
}