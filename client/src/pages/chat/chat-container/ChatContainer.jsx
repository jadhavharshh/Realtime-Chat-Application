import ChatHeader from "./components/chat-header/ChatHeader"
import MessageContainer from "./components/message-container/MessageContainer"
import MessageBar from "./components/message-bar/MessageBar"


const ChatContainer = () => {
  return (
    <div className="fixed top-0 h-[100vh] w-[100vw] bg-[#1c1b25] flex flex-col md:static md:flex-1">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />      
    </div>
  )
}

export default ChatContainer