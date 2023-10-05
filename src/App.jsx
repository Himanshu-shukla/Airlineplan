import React from 'react'
import Homepage from './Pages/Homepage'
import Loginpage from './Pages/Loginpage'
import { Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import ForgatePassword from './Pages/ForgatePassword';
import ResetPassword from './Pages/ResetPassword';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Loginpage />} />
      <Route path="/forget" element={<ForgatePassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/homepage" element={<Homepage />} />
    </Routes>
  )
}

export default App
