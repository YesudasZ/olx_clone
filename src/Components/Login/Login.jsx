import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { login } from '../../firebase/config';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To display error messages
  const { auth } = useContext(FirebaseContext);
  const navigate = useNavigate(); // For navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    try {
      // Call the login function
      await login(email, password);
      // Redirect to home page after successful login
      navigate('/');
    } catch (error) {
      // Set error message
      setError(error.message);
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
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
