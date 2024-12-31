import { userAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext , useContext, useEffect , useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const { userInfo } = userAppStore();
    useEffect(() => {
        if(userInfo){
            socket.current = io(HOST, {
                withCredentials: true,
                query: {userId : userInfo.id},
            });
            socket.current.on("connect", () => {
                console.log("Connected to the socket server");
            });
            
            const handleReceiveMessage = (message) => {
                const { selectedChatData, selectedChatType , addMessage,addContactsInDMContacts } = userAppStore.getState();
                if(selectedChatType!==undefined && 
                    (selectedChatData._id === message.sender._id  || 
                        selectedChatData._id === message.recipient._id)){
                        console.log("Received message", message);
                        addMessage(message);
                }
                addContactsInDMContacts(message);
            }

            const handleReceiveChannelMessage = (message) => {
                const {selectedChatData, selectedChatType, addMessage, addChannelInChannelList} = userAppStore.getState();
                if(selectedChatType!== undefined && selectedChatData._id === message.channelId){
                    addMessage(message);
                }
                addChannelInChannelList(message);
            };    
            socket.current.on("receiveMessage", handleReceiveMessage);
            socket.current.on("receive-channel-message", handleReceiveChannelMessage)
            return () => {
                socket.current.disconnect();
            };
        }
    
    }, [userInfo])
    
    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    )
}