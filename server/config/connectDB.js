import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URI){
    throw new Error("Please provide a mongodb uri in ");
}

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected DB")
    }
    catch(error){
        console.log("Error while connecting to database", error);
        //If server is not connected to database then we will exit the process. Server will stop
        process.exit(1);
    }
}

export default connectDB;