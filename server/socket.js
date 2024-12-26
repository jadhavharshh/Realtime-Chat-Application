import { disconnect } from 'mongoose';
import { Server as SocketIo } from 'socket.io';

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

    // Function to send message to the user
    io.on("connection", (socket)=>{
        const userId = socket.handshake.query.userId;

        if(userId){
            userSocketMap.set(userId, socket.id);
            console.log(`User ${userId} connected with socket id ${socket.id}`);
        } else {
            console.log("User Id not found in socket handshake query");
        }

        socket.on("disconnect", ()=> disconnect(socket));
    });

}

export default setupSocket;