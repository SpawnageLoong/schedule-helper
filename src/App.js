
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Signup/Signup'
import HomePage from './Components/HomePage/HomePage'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'

function App() {
  return (
    <Router>
      <main className="App">
      <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/ForgotPassword" element={<ForgotPassword/>} />
    </Routes>
    </main>
  </Router>
  );
}
export default App