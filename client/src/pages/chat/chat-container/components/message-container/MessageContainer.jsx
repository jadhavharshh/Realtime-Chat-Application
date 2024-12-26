import { userAppStore } from "@/store";
import moment from "moment";
import { useRef , useEffect } from "react";
 

const MessageContainer = () => {
  const scrollRef = useRef();
  const { selectedChatType , selectedChatData, userInfo , selectedChatMessages} = userAppStore();

  useEffect(() => {
    if(scrollRef.current){
      scrollRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [selectedChatMessages])
  

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