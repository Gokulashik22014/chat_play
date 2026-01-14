import { Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import Chat from './pages/chat/Chat'
const ChatRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default ChatRouter