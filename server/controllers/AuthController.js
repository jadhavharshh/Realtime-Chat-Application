import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

const maxAge = 3 * 24 * 60 * 60 * 1000;

// Create Token
const createToken = (email, userId) => {
    return jwt.sign({email, userId}, process.env.JWT_ENCRYPTION_KEY, {expiresIn: maxAge})
}

// Handles User Signup
export const signUp = async (request, response , next ) => {
    try{
        // Get the details from the user 
        const {email, password} = request.body;
        if (!email || !password){
            return response.status(400).send("Email and Password are required!")
        }
        // Check if the user already exists
        const existUser = await User.findOne({ email });
        if(existUser){
            return response.status(400).send("User Already Exists!");
        }
        const user = await User.create({email, password});
        response.cookie("jwt", createToken(email , user.id),{
                maxAge,
                secure:true,
                sameSite:"none",
        });
        return response.status(201).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
            },
        });
    } catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error!");
    }

}

export const login = async (request, response , next ) => {
    try{
        // Get the details from the user 
        const {email, password} = request.body;
        if (!email || !password){
            return response.status(400).send("Email and Password are required!")
        }
        const user = await User.findOne({ email });
        if(!user){
            return response.status(400).send("Invalid Email , User Does Not Exist!");
        }
        // Check if the password is correct using Bcrypt compare
        const auth = await compare(password, user.password);
        if(!auth){
            return response.status(400).send("Invalid Password!");
        }
        response.cookie("jwt", createToken(email , user.id),{
                maxAge,
                secure:true,
                sameSite:"none",
        });
        return response.status(200).json({
            user:{
                id:user.id,
                email:user.email,
                profileSetup:user.profileSetup,
                firstName:user.firstName,
                lastName: user.lastName,
                image:user.image,
                color:user.color,
            },
        });
    } catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error!");
    }

}

export const getUserInfo = async (request, response , next ) => {
    try{
        //console.log(request.userId);
        const userData = await User.findById(request.userId);
        if(!userData){
            return response.status(404).send("User Does Not Exist!");
        }
        return response.status(200).json({
                // Send the user data
                id:userData.id,
                email:userData.email,
                profileSetup:userData.profileSetup,
                firstName:userData.firstName,
                lastName: userData.lastName,
                image:userData.image,
                color:userData.color,

        });
    } catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error!");
    }

}