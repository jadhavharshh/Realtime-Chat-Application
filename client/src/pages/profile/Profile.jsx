import { userAppStore } from '@/store'
import React from 'react'

const Profile = () => {
  const {userInfo} = userAppStore();
  return (
    <>
    <div className='text-2xl '>
      <h1>ID : {userInfo.id}</h1>
      <h1>Mail : {userInfo.email}</h1>
    </div>
    </>
  )
}

export default Profile