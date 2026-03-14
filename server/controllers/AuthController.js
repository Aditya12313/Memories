import UserModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {OAuth2Client} from "google-auth-library";

const client=new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin= async (req, res)=>{
        try{
                const {token}=req.body;
                const ticket=await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.GOOGLE_CLIENT_ID
                })
                const payload=ticket.getPayload();
                const {sub,email,name}=payload;
                let user=await UserModel.findOne({email});
                if(!user){
                    user=new UserModel({
                        name,
                        email,
                        googleId:sub,
                    })
                    await user.save()
                }
                const JWTtoken=jwt.sign(
                    {id:user._id,email:user.email},
                    process.env.JWT_SECRET,
                    {expiresIn:"24h"}
                );
                res.json({message: "Google Login successful", token:JWTtoken,user});
        } catch(err){
                res.status(401).json({ message: "Google authentication failed" });
        }
}
export const signup= async (req,res)=>{
    try {
        const {name,email,password}=req.body;
        const user= await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:"User already exists, you can login",success:false});
        }
        const usermodel=new UserModel({name,email,password});
            usermodel.password=await bcrypt.hash(password,10);
        await usermodel.save();

        res.status(201).json({message:"Signup successful ",success:true});
    } catch (error) {
        res.status(500).json({message:"Internal server error", success:false});
    }
}
export const login= async (req,res)=>{
    try {
        const {email,password}=req.body;
        const user= await UserModel.findOne({email});
        const ErrMsg="Auth failed email or password is invalid";
        if(!user){
            return res.status(403)
            .json({message:ErrMsg,success:false});
        }
        const isPWequal=await bcrypt.compare(password,user.password);
        if(!isPWequal){
            return res.status(403)
            .json({message:ErrMsg,success:false});
        }
        const jwtToken=jwt.sign(
            {id:user.id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:"24h"}
        )
        res.status(200).json({message:"Login successful ",success:true,jwtToken,email,name:user.name});
    } catch (error) {
        res.status(500).json({message:"Internal server error", success:false});
    }
}

