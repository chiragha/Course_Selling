
import bcrypt from "bcryptjs";
import {httpUrl, z} from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Admin } from "../models/admin.model.js";


// signup admin 
export const signup = async (req,res) => {
     const {firstName, lastName, email, password} = req.body;

    //  validate all details 

    const adminSChema = z.object({
        firstName: z.string().min(3, {message:"firstName must be atLeast 3 char long"}),
        lastName: z.string().min(3, {message:"lastName must be tLeast 3 char long"}),
        email: z.string().email(),
        password: z.string().min(5, {message:"password must be tLeast 5 char long"})
    });
    const validateData = adminSChema.safeParse(req.body);
   if(!validateData.success){
    return res.status(400).json({errors:validateData.error.issues.map(err => err.message)});
   }

    //  for hashing password 
     const hashPassword = await bcrypt.hash(password, 10);

    try {
         const existingAdmin = await Admin.findOne({email:email});
         if(existingAdmin){
            return res.status(400).json({errors:"Admin already exists"});
         }

         const newAdmin = new Admin({firstName, lastName, email, password:hashPassword});
        //  save data in database 
         await newAdmin.save();
         res.status(201).json({message: "Signup succeeded",newAdmin});
    } catch (error) {
        res.status(500).json({errors: "Error in signup"});
        console.log("error in signup" , error);
    }
};


// login Admin 
export const login = async (req,res) => {
    
    const {email, password} = req.body;
    try {
        const admin = await Admin.findOne({email:email});
        const correctPassword = await bcrypt.compare(password, admin.password);

        if(!admin || !correctPassword){
            return res.status(403).json({errors : "invalid credential"});
        }

        // jwt token 

        const token = jwt.sign(
            {
            id:admin._id,
            }, 
        config.JWT_ADMIN_PASSWORD, {expiresIn: "1d"});

        const cookieOptions = {
            expires:new Date(Date.now() + 24*60  * 60 * 1000),
            httpUrl: true,
            secure: process.env.NODE_ENV === "production", // true for https only
            sameSite: "Strict",
        }
        res.cookie("jwt",token, cookieOptions);
        res.status(201).json({message: "login successful", admin, token});
    } catch (error) {
        res.status(500).json({errors: "error ion login"});
        console.log("error in login", error);
    }
};

// logout admin 
export const logout = async (req,res) => {
       try {
        res.clearCookie("jwt");
       res.status(200).json({message: "Logged out Successfully"});
       } catch (error) {
        res.status(500).json({errors: "error in logout"});
        console.log("error in logout", error)
       }
};

