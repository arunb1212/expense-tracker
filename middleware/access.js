

export const access=(...role)=>{
    return (req,res,next)=>{
const userrole=req.user.role
console.log(userrole)
if(!role.includes(userrole)){
    return res.status(403).json({message:`Unauthorized Access, you are ${userrole} and you are not authorized to access this page`})
}
    next()
}
}