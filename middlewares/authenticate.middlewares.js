const jwt = require('jsonwebtoken')
require('dotenv').config({path:'../.env'})
const Employee = require('../models/employee.models')

exports.verifyUser = async (req, res, next)=>{
    const auth = req.headers.authorization
    console.log(auth)
    if(!auth) return res.status(401).json({
        title:"auth error",
        msg:"token not found"
    })
    const token = auth.split(" ")[1]
    try {
        const {id} = jwt.verify(token, process.env.JWT_SECRET)
        console.log(id)
        const authEmp = await Employee.findById(id)
        if(!authEmp) throw Error("id invalid")
        req.employee = authEmp;
        next()
    } catch (error) {
        res.status(500).json({
            title:"internal server error",
            msg:"Employee is not available in the current db"
        })
    }
}