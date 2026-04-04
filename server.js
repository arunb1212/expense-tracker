import express from "express"
import dotenv from "dotenv"
import connectdb from "./utilities/db.js"
import authroute from "./routes/authroutes.js"
import accerouter from "./routes/roleroutes.js"
import cookieParser from "cookie-parser"
const app=express()
const port=3000
dotenv.config()
app.use(cookieParser())
connectdb()
app.use(express.json())
app.use("/api/auth",authroute)
app.use("/api/access",accerouter)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})