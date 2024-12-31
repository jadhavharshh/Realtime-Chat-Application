import { Server as SocketIo } from 'socket.io';
import Message from './models/MessageModels.js';
import Channel from './models/ChannelModel.js';

const setupSocket = (server) => {
    const io = new SocketIo(server, {
        cors:{
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials : true,
        },
    }); 

    const userSocketMap = new Map();

    // Function to disconnect the user
    const disconnect = (socket) => {
        console.log(`Socket ${socket.id} disconnected`);
        for(const[userId,socketId] of userSocketMap.entries()) {
            if(socketId === socket.id){
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    const sendChannelMessage = async (message) => {
        console.log("Sending channel message BEYA", message);
        const { channelId, sender, content, messageType, fileUrl } = message;
    
        const createdMessage = await Message.create({
            sender,
            recipient: null,
            content,
            messageType,
            timestamp: new Date(),
            fileUrl,
        });
    
        const messageData = await Message.findById(createdMessage._id)
            .populate("sender", "id email firstName lastName image color")
            .exec();
    
        await Channel.findByIdAndUpdate(channelId, {
            $push: {
                messages: createdMessage._id
            },
        });
    
        const channel = await Channel.findById(channelId).populate("members"); // Renamed from 'Channel' to 'channel'
    
        const finalData = { ...messageData._doc, channelId: channel._id };
    
        if (channel && channel.members) { // Use the correctly named 'channel'
            channel.members.forEach((member) => {
                const memberSocketId = userSocketMap.get(member._id.toString());
                if (memberSocketId) {
                    io.to(memberSocketId).emit("receive-channel-message", finalData);
                }
            });
            const adminSocketId = userSocketMap.get(channel.admin._id.toString()); // Use 'channel' instead of 'Channel'
            if (adminSocketId) {
                io.to(adminSocketId).emit("receive-channel-message", finalData);
            }
        }
    };
    const sendMessage = async (message) => {
        // Get the socket id of the sender and recipient
        const senderSocketId = userSocketMap.get(message.sender); 
        const recipientSocketId = userSocketMap.get(message.recipient);

        // Create the message in the database to use it as a history of chats between users
        const createdMessage = await Message.create(message);

        const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstName lastName image color")
        .populate("recipient", "id email firstName lastName image color")

        if(recipientSocketId){
            io.to(recipientSocketId).emit("receiveMessage", messageData);
        }

        if(senderSocketId){
            io.to(senderSocketId).emit("receiveMessage", messageData);
        }
    }

    // Function to send message to the user
    io.on("connection", (socket)=>{
        const userId = socket.handshake.query.userId;

        if(userId){
            userSocketMap.set(userId, socket.id);
            console.log(`User ${userId} connected with socket id ${socket.id}`);
        } else {
            console.log("User Id not found in socket handshake query");
        }

        socket.on("sendMessage", sendMessage)
        socket.on("send-channel-message", sendChannelMessage)
        socket.on("disconnect", ()=> disconnect(socket));
    });

}

export default setupSocket;