// We will be use Es6 so we added "type": "module" in package.json file
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan'
import helmet from 'helmet'
const app= express();
dotenv.config();
// we need to pass .js extension in import statement for importing user defined modules
import connectDB from './config/connectDB.js';
const PORT= 8080 || process.env.PORT;

// app configuration 
app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));




// Routes for app 
app.get('/', (req, res)=>{
    res.json({msg:"Server is running"})
})

connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    })
})
