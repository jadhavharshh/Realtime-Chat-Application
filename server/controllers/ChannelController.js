import Users from "../models/UserModel.js"
import Channel from "../models/ChannelModel.js"
import mongoose from "mongoose";

// Get all channels
export const CreateChannel = async (request, response , next) => {
    try {
        const { name , members } = request.body;
        const userId = request.userId;

        const admin = await Users.findById(userId);
        if(!admin) return response.status(404).json({message: "Admin is required not found"});

        const validMembers = await Users.find({_id : { $in : members}});

        if(validMembers.length !== members.length) {
            return response.status(404).json({message: "Some members not found"});
        }

        const newChannel = new Channel({
            name,
            members,
            admin: userId,
        });

        await newChannel.save();
        return response.status(201).json({channel : newChannel});

    } catch (error) {
        console.log(error);
        return response.status(500).json({message: "Internal Server Error"});
    }
}

// Get the channels on Refresh
export const getUserChannels = async (request, response , next) => {
    try {
        const userId = new mongoose.Types.ObjectId(request.userId);

        const channels = await Channel.find({
            $or : [{admin:userId},{members:userId}],
        }).sort({updatedAt:-1 })

        return response.status(201).json({channels});

    } catch (error) {
        console.log(error);
        return response.status(500).json({message: "Internal Server Error"});
    }
}