import UserModel from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
// https://resend.com/      -> This website is used for email service
// https://resend.com/docs/send-with-nodejs
export async function registerUserController(req, res){
    try{
        const {name, email, password}= req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"Provide name, email and password",
                error: true,
                success: false
            })
        }

        const user= await UserModel.findOne({email})
        if(user){
            return res.json({
                message: "Already Registered",
                error: true,
                success:false
            })
        }

        const salt= await bcryptjs.genSalt(10)
        const hashPassword= bcryptjs.hash(password, salt)

        const payload= {
            name,
            email,
            hashPassword
        }

        const newUser= new UserModel(payload)
        const save= await newUser.save()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            message: err.message || err,
            error: true,
            success:false

        })
    }
}