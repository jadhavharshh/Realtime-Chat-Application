import { useRef, useState , useEffect} from "react"
import { GrAttachment } from "react-icons/gr"
import { IoSend } from "react-icons/io5"
import { RiEmojiStickerLine } from "react-icons/ri"
import EmojiPicker from 'emoji-picker-react';
import { useSocket } from "@/context/SocketContext";
import { userAppStore } from "@/store";
import { apiClient } from "@/lib/api-client";
import { UPLOAD_FILE_ROUTE } from "@/utils/constants";
import { toast } from "sonner";

const MessageBar = () => {
  const emojiRef = useRef();
  const fileInputRef = useRef();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const { userInfo,selectedChatType, selectedChatData ,  setFileUploadProgress , isUploading ,setIsUploading } = userAppStore();

  useEffect(() => {
    function handleClickOutside(event){
      if(emojiRef.current && !emojiRef.current.contains(event.target)){
        setEmojiPickerOpen(false); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [emojiRef]);
  

  const handleAddEmoji = (emoji) =>{
    setMessage((msg) => msg + emoji.emoji);
  };
  const handleSendMessage = async () => {
    if(selectedChatType === "contact"){
      socket.emit("sendMessage", {
        sender:userInfo.id,
        content:message,
        recipient:selectedChatData._id,
        messageType:"text",
        fileUrl:undefined,

      });
    } else if (selectedChatType === "channel"){
      console.log("Sending channel message", message)
      socket.emit("send-channel-message", {
        sender:userInfo.id,
        content:message,
        messageType:"text",
        fileUrl:undefined,
        channelId : selectedChatData._id
      });
    }
    else{
      console.error("Socket emit is not initialized");
    }
    setMessage("");
  }

  const handleAttachmentClick = async () => {
    if(fileInputRef.current){
      fileInputRef.current.click();
    }
  }

  const handleAttachmentChange = async () => {
    try {
      const file = event.target.files[0];
      console.log(file)
      if(file){
        const formData = new FormData();
        formData.append("file", file);
        setIsUploading(true);

        const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, 
          {withCredentials:true,
            onUploadProgress : (data) => {
              setFileUploadProgress(Math.round((100 * data.loaded) / data.total));
            }

          });
        if(response.status===200 && response.data){
          setIsUploading(false);
          if(selectedChatType === "contact"){
            socket.emit("sendMessage", {
              sender:userInfo.id,
              content:"",
              recipient:selectedChatData._id,
              messageType:"file",
              fileUrl:response.data.file,
            });
          }
          else if (selectedChatType==="channel"){
            console.log("Sending Channel File", response.data.file);
            socket.emit("send-channel-message", {
              sender:userInfo.id,
              content:undefined,
              messageType:"file",
              fileUrl:response.data.file,
              channelId : selectedChatData._id
            });
          }
        }
      }

    } catch (error) {
      setIsUploading(false);
      console.log({error});
    }

  }
  return (
    <div className="h-[10vh] flex justify-center items-center px-8 mb-6 gap-3">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input type="text"
        className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none" 
        placeholder="Enter a Message"
        value={message}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        onChange={(e)=> setMessage(e.target.value)}/>
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleAttachmentClick}>
          <GrAttachment className="text-2xl"/>
          </button>
          <input type="file" className="hidden"  ref={fileInputRef} onChange={handleAttachmentChange}/>
        <div className="relative">
          <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={() => setEmojiPickerOpen(true)}>
          <RiEmojiStickerLine  className="text-2xl"/>
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark"
            open={emojiPickerOpen}
            onEmojiClick={handleAddEmoji}
            autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
        <button className="text-white bg-[#8471ff] hover:bg-[#741bda] focus:bg-[#741bda] rounded-md flex items-center justify-center p-5 focus:border-none focus:outline-none focus:text-white duration-300 transition-all" onClick={handleSendMessage} >
        <IoSend className="text-2xl"/>
        </button>
    </div>
  )
}

export default MessageBar