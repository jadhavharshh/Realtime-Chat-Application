import { apiClient } from "@/lib/api-client";
import { userAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "@/utils/constants";
import moment from "moment";
import { useRef , useEffect } from "react";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowDown } from "react-icons/io";

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType , selectedChatData, userInfo , selectedChatMessages, setSelectedChatMessages} = userAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log("ID IS:",selectedChatData._id);
        const response = await apiClient.post
        (GET_ALL_MESSAGES_ROUTE, 
        {id:selectedChatData._id},
        {withCredentials:true});
        if(response.data.messages){
          setSelectedChatMessages(response.data.messages);
          console.log("called the setselectedchatmessages")
        }
      } catch (error) {
        console.log({ error });
      }
    }
    if(selectedChatData._id){
      if(selectedChatType === "contact"){
        console.log("Called the GETMESSAGES")
        getMessages();
      }
    }

  }, [selectedChatData, selectedChatType , setSelectedChatMessages])
  

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [selectedChatMessages])
  
  const checkIfImage = (filePath) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
    };

  const downloadFile = async (url) => {
    const response = await apiClient.get(`${HOST}/${url}`, {responseType:"blob"});
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);

  }
  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showData = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={message._id}>
          {showData && 
          <div className="text-center text-gray-500 my-2">
          {moment(message.timestamp).format("LL")}</div>}

          {
            selectedChatType === "contact" && renderDMMessages(message)
          }
        </div>
      )
    });
  };

  const renderDMMessages = (message) => {
    return (
      <div className={`${
        message.sender !== selectedChatData._id ? "text-right" : "text-left"
      }`}>
        {
          message.messageType === "text" && (
            <div className={`${
              message.sender !== selectedChatData._id ? 
              "bg-[#8417ff]/5 text-[#8417ff] border-[#8417ff]/50" : 
              "bg-[#2a2b33]/5 text-[#fff] border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
              >{message.content}</div>
          )
        }
        {
          message.messageType === "file" && 
          <div className={`${
            message.sender !== selectedChatData._id ? 
            "bg-[#8417ff]/5 text-[#8417ff] border-[#8417ff]/50" : 
            "bg-[#2a2b33]/5 text-[#fff] border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
            >{checkIfImage(message.fileUrl)? <div className="cursor-pointer">
      <img
        src={(`${HOST}/${message.fileUrl}`)}
        alt="uploaded"
        style={{ maxWidth: "400px" }}
      />
            </div>: 
              <div className="flex items-center gap-2 justify-center">
                <span className="text-white text-3xl bg-black rounded-full p-3 ">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span className="text-white flex justify-center items-center text-xl transition-all duration-300 bg-black/20 rounded-full p-3 cursor-pointer hover:bg-black/100" 
                onClick={() => downloadFile(message.fileUrl)}>
                <IoMdArrowDown className=""/>
                </span>
              </div>}</div>
        }
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8  w-full">
      {renderMessages()}
      <div ref={scrollRef}/>
    </div>
  )
}

export default MessageContainer