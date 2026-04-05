import {User} from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// register controller
export const register=async(req,res)=>{
    try {
        const {name,email,password,role}=req.body
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"all fields are required"})
        }
        const isexist=await User.findOne({email})
        if(isexist){
            return res.status(400).json({message:"user already exists"})
        }
        const hashed= await bcrypt.hash(password,10)

        const token = jwt.sign({id:User._id,role:User.role},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token)
        const newuser=await User.create({name,email,password:hashed,role})
        res.status(201).json({message:"user created successfully",newuser})
    } catch (error) {
        console.log(error.message)
    }
}



// login controllers
export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(400).json({message:"all fields are required"})
        }
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        const ismatch=await bcrypt.compare(password,user.password)
        if(!ismatch){
            return res.status(400).json({message:"invalid credentials"})
        }
        const token = jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token)
        res.status(200).json({message:`welcome back ${user.name}`})
    } catch (error) {
        console.log(error.message)
    }
}