const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next)=>{
    const token = req.cookies?.token
    if (!token) return res.status(401).json(
        { error: "Not authenticated" }
    );
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = payload;
        next()
    } catch (error) {
        res.status(401).json({ error: "Token invalid" });
    }
}

const isAdmin = (req,res,next)=>{
    const role = req.user?.role
    if(role !== 'admin') return res.status(401).json(
        { error: "Forbidden" }
    )
    next()
}
const isOwner = (req,res,next)=>{
    if(req.user.role !== 'owner'){
        return res.status(401).json({
            error :"Forbidden"
        })
    }
    next()
}

module.exports = {verifyToken,isAdmin,isOwner}