import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

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
        const user = await User.create({email, password});
        response.cookie("jwt", createToken(email , user.Id),{
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