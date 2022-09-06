const router = require('express').Router();
const Employee = require('../models/employee.models')
const bcrypt = require('bcryptjs');
const { createToken } = require('../services/auth.services');
const { verifyUser } = require('../middlewares/authenticate.middlewares');
const { isAdmin } = require('../middlewares/adminCheck.middleware');
const saltRounds = 8;

router.post('/employees', verifyUser, async(req, res)=>{
    let {name, username, password, email, stack, experienced=false, role='user'} = req.body;
    try {
        if(!(name && username && password && email && stack, role)) return res.status(401).json({
            title:"error",
            statusCode:res.statusCode,
            msg:"please fill all the inputs"
        })

        let salt = await bcrypt.genSalt(saltRounds)
        const encryptedPassword = await bcrypt.hash(password, salt)
        password = null;
        const result = await Employee.create({name, username, password:encryptedPassword, email, stack, experienced, role})
        const token = createToken(result._id.toHexString(), '24h')
        res.status(201).json({
            title:"Data inserted",
            statusCode:res.statusCode,
            token,
            data:result
        })
    } catch (error) {
        res.status(500).json({
            title:"internal server error",
            statusCode:res.statusCode,
            error:error.message
        })
    }
})

router.post('/employees/login', async(req, res)=>{
    let {username, password} = req.body;
    if(!(username && password)) return res.status(401).json({
        title:"error",
        statusCode:res.statusCode,
        msg:"please fill all the inputs"
    })
    try {
        const result = await Employee.find({$or:[{username}, {email:username}]})
        if(result.length === 0) return res.status(401).json({
            title:"error",
            statusCode:res.statusCode,
            msg:"invalid email/password"
        })
    
        const isPasswordCorrect = await bcrypt.compare(password, result[0].password)
        if(!isPasswordCorrect) return res.status(401).json({
            title:"error",
            statusCode:res.statusCode,
            msg:"invalid email/password"
        })
    
        const token = createToken(result[0]._id.toHexString(), '24h')
        res.status(200).json({
            title:"Log in success",
            statusCode:res.statusCode,
            token,
            data:result
        })
        
    } catch (error) {
        res.status(500).json({
            title:"internal server error",
            statusCode:res.statusCode,
            error:error.message
        })
    }
})

router.get('/employee', verifyUser, async (req, res)=>{
    res.status(200).json(req.employee)
})



module.exports = router;