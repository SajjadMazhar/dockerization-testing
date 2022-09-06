const mongoose = require('mongoose')

const empSchema = new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    stack:{
        type:Array
    },
    experienced:{
        type:Boolean
    },
    role:{
        type:String
    }
})

module.exports = mongoose.model('employees', empSchema, 'Employees')