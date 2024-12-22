import { userAppStore } from '@/store'
import React , {useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './chat-container/ChatContainer';
import EmptyChatContainer from './empty-chat-container/EmptyChatContainer';
import ContactsContainer from './contacts-container/ContactsContainer';

const Chat = () => {
  const { userInfo } = userAppStore();
  const navigate = useNavigate();
  useEffect(() => {
  if(!userInfo.profileSetup){
    toast.info('Please complete your profile setup to continue');
    navigate('/profile');
  }
  
  }, [userInfo, navigate])
  
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      <ContactsContainer  />
      {/* <EmptyChatContainer /> */}
      {/* <ChatContainer /> */}
    </div>
  )
}

export default Chat