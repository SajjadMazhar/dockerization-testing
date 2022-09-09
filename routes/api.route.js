const router = require('express').Router();
const { isAdmin } = require('../middlewares/adminCheck.middleware');
const { verifyUser } = require('../middlewares/authenticate.middlewares');
const Employee = require('../models/employee.models')

router.get('/admin/employees', verifyUser, async(req, res)=>{
    try {
        const emps = await Employee.find({})
        res.json({
            user:'admin',
            statusCode:res.statusCode,
            data:emps
        })
    } catch (error) {
        res.status(500).json({
            title:"internal server error",
            statusCode:res.statusCode,
            error:error.message
        })
    }
})

router.put('/admin/employees/:id',  async(req, res)=>{
    const id = req.params.id;
    try {
        const result = await Employee.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            title:"updated",
            statusCode:res.statusCode,
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

router.delete('/admin/employees/:id', verifyUser,  async(req, res)=>{
    const id = req.params.id;
    if(!id) return res.status(400).json({
        title:"id not found",
        msg:"please provide an id"
    })
    if(id === req.employee._id.toHexString()) return res.status(400).json({
        title:'forbidden',
        msg:"You just can't delete yourself",
    }) ;
    try {
        const result = await Employee.findByIdAndDelete(id)
        res.status(200).json({
            title:"deleted",
            statusCode:res.statusCode,
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

router.get('/download', async(req, res)=>{
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition")
    res.download('/home/sajjad/Downloads/Screencast from 24-08-22 02:28:28 PM IST.webm', (err)=>{
        if(err) return console.log(err)
        console.log("downloaded")
    })
})

module.exports = router;
