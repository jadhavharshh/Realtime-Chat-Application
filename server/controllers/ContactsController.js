import mongoose from "mongoose";
import User from "../models/UserModel.js";
import Message from "../models/MessageModels.js";

export const searchContacts = async (request, response, next) => {
    try {
        const {searchTerm} = request.body;
        if(searchTerm === undefined || searchTerm === null) {
            return response.status(400).send("Search Term is required!");
        }

        const sanitizedSearchTerm = searchTerm.replace(
            /[.*+?^${}()|\[\]\\]/g,
            "\\$&"
        );
        const regex = new RegExp(sanitizedSearchTerm, "i");

        const contacts = await User.find({
            // Gets the ID of the user that is not the current user
            $and: 
            [{_id : {$ne:request.userId}},
            {
                $or:[{firstName : regex }, 
                    {lastName : regex }, 
                    {email : regex }]
            }
            ,]
            });

            return response.status(200).json({contacts});
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error!");
    }
};

export const getContactsForDMList = async (request, response, next) => {
    try {
        console.log("getContactsForDMList FUNCTION CALLED");
        let { userId } = request;
        userId = new mongoose.Types.ObjectId(userId);

        const contacts = await Message.aggregate([
            {
                $match: {
                    $or: [{ sender: userId }, { recipient: userId }],
                },
            },
            {
                $sort:{timestamp:-1}
            },
            {
                $group:{
                    _id:{
                        $cond:{
                            if:{$eq:["$sender",userId]},
                            then: "$recipient",
                            else: "$sender"
                        },
                    },
                    lastMessage:{$first: "$timestamp"}
                },
            },
            {$lookup:{
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"contactInfo",
            }},
            {
                $unwind:"$contactInfo",
            },
            {
                $project:{
                    _id:1,
                    lastMessage:1,
                    email:"$contactInfo.email",
                    firstName:"$contactInfo.firstName",
                    lastName:"$contactInfo.lastName",
                    image:"$contactInfo.image",
                    color:"$contactInfo.color",
                },
            },
            {
                $sort:{lastMessage:-1}
            }
        ])
        return response.status(200).json({contacts});
    } catch (error) {
        console.log({ error });
        return response.status(500).send("Internal Server Error!");
    }
};


export const getAllContacts = async (request, response, next) => {
    try {
        console.log("getAllContacts FUNCTION CALLED");
        const users = await User.find(
            {_id : {$ne:request.userId}},
            "firstName lastName _id email"
        );

        const contacts = users.map((user) => ({
            label : user.firstName ? `${user.firstName} ${user.lastName}` : user.email,
            value : user._id,
        }))
        

        return response.status(200).json({contacts});
    } catch (error) {

        console.error("Unexpected response:", error);
        return response.status(500).send("Internal Server Error!");
    }
};