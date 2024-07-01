import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { signup } from '../../firebase/config';
import { Link } from 'react-router-dom';


export default function Signup() {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await signup(Username, Email, Password, phone);
      
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="flex justify-center h-screen mt-10 mb-20 ">
      <div className="bg-white rounded-md shadow-md px-20 max-w-md">
        <img src={Logo} alt="Logo" className="w-48 h-48 mx-auto mb-4" />
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="fname" className="text-lg mb-2">Username</label>
          <input
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
          <label htmlFor="email" className="text-lg mb-2">Email</label>
          <input
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
          <label htmlFor="phone" className="text-lg mb-2">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            className="bg-gray-100 rounded-md py-2 px-4 w-full"
          />
          <label htmlFor="password" className="text-lg mb-2">Password</label>
          <input
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="bg-gray-100 rounded-md py-2 px-4 w-full "
          />
          <button type="submit"  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-5">
            Signup
          </button>
        </form>
        <Link to="/login" className="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out m-5 flex justify-center">
          Login
        </Link>
      </div>
    </div>
  );
}