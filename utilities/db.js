import mongoose from "mongoose";


const connectdb=async()=>{
    try {
            mongoose.connect(process.env.MONGODB_URI)
            console.log("connected to mongodb")
    } catch (error) {
        console.log(error.message)
    }
}

export default connectdb