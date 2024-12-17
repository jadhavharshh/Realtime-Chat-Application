import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Profile from './pages/profile/Profile'
import Chat from './pages/chat/Chat'
import { userAppStore } from './store'

const PrivateRoute = ({ children }) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

const AuthRoute = ({ children }) => {
  const { userInfo } = userAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat"/>: children ;
}

const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<Navigate to="/auth" />} />
      <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
      <Route path="/chat" element={<Chat />} />

      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App