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