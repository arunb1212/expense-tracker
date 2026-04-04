import express from "express"
import {register,login} from "../controllers/authControllers.js"

const authroute=express.Router()

authroute.post("/register",register)
authroute.post("/login",login)


export default authroute