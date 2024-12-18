import React, { useState , useEffect} from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Profile from './pages/profile/Profile'
import Chat from './pages/chat/Chat'
import { userAppStore } from './store'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'

const PrivateRoute = ({ children }) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

const AuthRoute = ({ children }) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/profile"/>: children ;
}

const App = () => {
  const { userInfo , setUserInfo } = userAppStore();
  const [loading, Setloading] = useState(true);
  // useEffect hook to get user data
  useEffect(() => {
  const getUserData = async () => {
    // Fetch user data from the server
    try {
      const response = await apiClient.get(GET_USER_INFO,{
        withCredentials:true
      });
      if(response.status === 200 && response.data){
        setUserInfo(response.data); // Set the user data in the store
      } else {
        setUserInfo(undefined); // Set the user data in the store
      }

      console.log({response});
    } catch (error) {
      setUserInfo(undefined); // Set the user data in the store
      console.log({error}); // Log the error
    } finally {
      Setloading(false); // Set loading to false
    }
  };
  // Checks if userInfo is null, if it is it calls the getUserData function
  if(!userInfo){
    getUserData();
  }
  else{
    Setloading(false);
  }
  }, [ userInfo, setUserInfo])

  if(loading){
    return     <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
  }
  // if(loading){
  //   return <h1>Loading.....</h1>
  // }
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App