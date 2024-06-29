import { Routes, Route } from "react-router-dom";'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from "./Components/Login/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div>
         <ToastContainer />
   <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
