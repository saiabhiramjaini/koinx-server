import mongoose from "mongoose";
require("dotenv").config();

const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URI!).then(()=>{
        console.log("DB Connected");
    }).catch((e)=>{
        console.error(e);
    })
}

export default connectDB;