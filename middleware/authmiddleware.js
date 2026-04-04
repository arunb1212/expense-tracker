import jwt from "jsonwebtoken";

export const verifytoken=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({message:"NO Token Found & unauthorized access"})
    }
    const getuser= jwt.verify(token,process.env.JWT_SECRET)
    if(!getuser){
        return res.status(401).json({message:"Unauthorized Access"})
    }
    req.user=getuser
    console.log(req.user);
    next()
}