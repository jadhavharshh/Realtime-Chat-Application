// This is a model for the user table in the database (MongoDB). 
// It is used to define the schema for the user table and export it to be used in the controller.

import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"],

    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    },
    color:{
        type:Number,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        required:false,
    }, 
})

userSchema.pre("save", async function(next){
    const salt = await genSalt();
    this.password = await hash(this.password, salt);
});


const User = mongoose.model("User", userSchema);

export default User;