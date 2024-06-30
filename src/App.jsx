import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from "./Components/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { AuthContext } from './store/Context';

function App() {
  const { user } = useContext(AuthContext);
  useEffect(()=>{
    console.log("test auth",user);
  },[user])
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
