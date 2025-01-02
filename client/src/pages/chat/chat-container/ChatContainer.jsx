import ChatHeader from "./components/chat-header/ChatHeader"
import MessageContainer from "./components/message-container/MessageContainer"
import MessageBar from "./components/message-bar/MessageBar"


const ChatContainer = () => {
  return (
    <div className="fixed top-0 h-[100vh] w-[100vw] bg-gradient-to-br from-[#1a1a1a] via-[#232323] to-[#0f0f0f] backdrop-blur-lg bg-opacity-90 flex flex-col md:static md:flex-1">
      <ChatHeader />
      <MessageContainer />
      <MessageBar />      
    </div>
  )
}

export default ChatContainer