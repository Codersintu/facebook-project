import { useContext, useState } from 'react'
import Profile from './Pages/profile/Profile'
import Login from './Pages/login/Login'
import Register from './Pages/register/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { Home } from './Pages/Home/Home';
import { AuthContext } from './context/AuthContext';
import Messegner from './Pages/messegner/messegner';

function App() {
  const {user} =useContext(AuthContext)
  return (
    
    <Router>
      <Routes>
        <Route exact path="/" element={user ?<Home /> : <Register/> } />
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
        <Route path="/messenger" element={user ? <Messegner /> : <Navigate to="/"/>} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
