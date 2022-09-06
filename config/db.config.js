const mongoose = require("mongoose")
require('dotenv').config({path:"../.env"})

exports.mongoConnect = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connection estabilised with mongo")
    }).catch(err => {
        console.log(err.message)
    })
}