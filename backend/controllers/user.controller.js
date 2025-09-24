import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {httpUrl, z} from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { Purchase } from "../models/purchase.model.js";
import { Course } from "../models/course.model.js";


// signup user 
export const signup = async (req,res) => {
     const {firstName, lastName, email, password} = req.body;

    //  validate all details 

    const userSchema = z.object({
        firstName: z.string().min(3, {message:"firstName must be atLeast 3 char long"}),
        lastName: z.string().min(3, {message:"lastName must be tLeast 3 char long"}),
        email: z.string().email(),
        password: z.string().min(5, {message:"password must be tLeast 5 char long"})
    });
    const validateData = userSchema.safeParse(req.body);
   if(!validateData.success){
    return res.status(400).json({errors:validateData.error.issues.map(err => err.message)});
   }

    //  for hashing password 
     const hashPassword = await bcrypt.hash(password, 10);

    try {
         const existingUser = await User.findOne({email:email});
         if(existingUser){
            return res.status(400).json({errors:"User already exists"});
         }

         const newUser = new User({firstName, lastName, email, password:hashPassword});
        //  save data in database 
         await newUser.save();
         res.status(201).json({message: "Signup succeeded",newUser});
    } catch (error) {
        res.status(500).json({errors: "Error in signup"});
        console.log("error in signup" , error);
    }
};


// login user 
export const login = async (req,res) => {
    
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email:email});
        const correctPassword = await bcrypt.compare(password, user.password);

        if(!user || !correctPassword){
            return res.status(403).json({errors : "invalid credential"});
        }

        // jwt token 

        const token = jwt.sign(
            {
            id:user._id,
            }, 
        config.JWT_USER_PASSWORD, {expiresIn: "1d"});

        const cookieOptions = {
            expires:new Date(Date.now() + 24*60  * 60 * 1000),
            httpUrl: true,
            secure: process.env.NODE_ENV === "production", // true for https only
            sameSite: "Strict",
        }
        res.cookie("jwt",token, cookieOptions);
        res.status(201).json({message: "login successful", user, token});
    } catch (error) {
        res.status(500).json({errors: "error ion login"});
        console.log("error in login", error);
    }
};

// logout user 
export const logout = async (req,res) => {
       try {
        res.clearCookie("jwt");
       res.status(200).json({message: "Logged out Successfully"});
       } catch (error) {
        res.status(500).json({errors: "error in logout"});
        console.log("error in logout", error)
       }
};

// purchased course 
export const purchase = async (req,res) => {
    const userId= req.userId;
       try {
        const purchased = await Purchase.find({ userId });
        let purchasedCourseId = [];

        for(let i = 0; i< purchased.length; i++){
            purchasedCourseId.push(purchased[i].courseId);
        }
            const courseData = await Course.find({
                _id: { $in: purchasedCourseId},
            });
         res.status(200).json({purchased, courseData});
       } catch (error) {
        res.status(500).json({errors: "error in purchases"});
        console.log("error in purchases", error)
       }
};