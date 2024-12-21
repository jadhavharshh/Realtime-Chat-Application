import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { existsSync, renameSync , unlinkSync} from "fs";
// Max Age for the cookie
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

// Update User Profile function in Profile.jsx
export const updateProfile = async (request, response , next ) => {
    try{
        //console.log(request.userId);
        const {userId} = request;
        const {firstName, lastName, color} = request.body;
        if(!firstName || !lastName || color === undefined){
            return response.status(400).send("First Name, Last Name and Color are required!");
        }

        const userData = await User.findByIdAndUpdate(
            userId,
            {
            firstName, 
            lastName, 
            color, 
            profileSetup:true
            },
            {new:true, runValidators:true});
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


export const addProfileImage = async (request, response , next ) => {
    try{
        if(!request.file){
            return response.status(400).send("Image is required!");
        }
        const date = Date.now()
        let fileName = "uploads/profiles/" + date + encodeURIComponent(request.file.originalname);
        renameSync(request.file.path, fileName);

        const updatedUser = await User.findByIdAndUpdate(request.userId, {image:fileName}, {new:true , runValidators:true});
        return response.status(200).json({
            image : updatedUser.image,

        });
    } catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error!");
    }

}

export const removeProfileImage = async (request, response , next ) => {
    try{
        //console.log(request.userId);
        const {userId} = request;
        const user = await User.findById(userId);
        if(!user){
            return response.status(404).send("User Does Not Exist!");
        }
        if(!user.image){
            return response.status(400).send("No Image to Remove!");
        }
        if(user.image){
            if(existsSync(user.image)){
                unlinkSync(user.image);}
        }
        user.image=null;
        await user.save();
        return response.status(200).send("Image Removed Successfully!");
    } catch(error){
        console.log({error});
        return response.status(500).send("Internal Server Error!");
    }

}