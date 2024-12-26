import mongoose from "mongoose";
import User from "./UserModel.js";
const messageSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the Users model
        required: true
    },
    recipient :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // reference to the Users model
        required: false
    },
    messageType:{
        type: String,
        enum : ["text", "file"],
        required: true
    },
    content: {
        type: String,
        required: function () {
            return this.messageType === "text"; // required if messageType is text
        },
    },
    fileUrl : {
        type: String,
        required: function () {
            return this.messageType === "file"; // required if messageType is text
        },
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }


});

const Message = mongoose.model("Messages", messageSchema);

export default Message;