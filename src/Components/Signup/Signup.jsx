import { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  
  const history = useNavigate()

  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [Password, setPassword] = useState('');
  const { auth } = useContext(FirebaseContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createUserWithEmailAndPassword(auth, Email, Password);
      await updateProfile(result.user, { displayName: Username }).then(()=>{
       firebase.firestore().collection('user').add({
        id:result.user.uid,
        Username: Username,
        phone:phone
       }).then(()=>{
          history('/')
       }) 
      });
      console.log('User created:', result);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={Username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            placeholder="John"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="john@example.com"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
            placeholder="1234567890"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="********"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
