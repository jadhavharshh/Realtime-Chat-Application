import { userAppStore } from '@/store'
import React , {useEffect}from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ChatContainer from './chat-container/ChatContainer';
import EmptyChatContainer from './empty-chat-container/EmptyChatContainer';
import ContactsContainer from './contacts-container/ContactsContainer';

const Chat = () => {
  const { userInfo , 
        selectedChatType ,    
        isUploading,
        isDownloading,
        fileUploadProgress,
        fileDownloadProgress,
      } = userAppStore();
  const navigate = useNavigate();
  useEffect(() => {
  if(!userInfo.profileSetup){
    toast.info('Please complete your profile setup to continue');
    navigate('/profile');
  }
  
  }, [userInfo, navigate])
  
  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>
      {
        isUploading && <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg'>
          <h5 className='text-5xl animate-pulse'>UPLOADING FILE TEXT</h5>
          {fileUploadProgress}%
        </div>
      }
      {
        isDownloading && <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg'>
          <h5 className='text-5xl animate-pulse'>DOWNLOADING FILE </h5>
          {fileDownloadProgress}%
        </div>
      }
      <ContactsContainer  />
      {
        selectedChatType === undefined ? (
          <EmptyChatContainer />
        ) : (
          <ChatContainer />
        )
      }

    </div>
  )
}

export default Chat