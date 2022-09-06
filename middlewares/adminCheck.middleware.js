exports.isAdmin = (req, res, next)=>{
    const emp = req.employee;
    if(emp.role !== 'admin') return res.status(401).json({
        title:"route is for admin",
        msg:"you are forbidden to this route"
    })
    next()
}