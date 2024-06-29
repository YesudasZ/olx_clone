import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { login } from '../../firebase/config';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const userCredential = await login(email, password);
      const user = userCredential.user;
      if (user) {
        toast.success('Login successful!');
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      // setError('Invalid email or password. Please try again.');
      // toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="Logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
            placeholder="john@example.com"
            required
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            placeholder="********"
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>}
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;