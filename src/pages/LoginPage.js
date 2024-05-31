import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post('https://mern-blog-api-eight.vercel.app/login', { 
				username, password 
			});

			console.log(response.data)
      if (response.data.token) {
				console.log(response.data)
        localStorage.setItem('token', response.data.token);
        setUserInfo({
          id: response.data.id,
          username: response.data.username
        });
        setRedirect(true);
        alert('Login successful');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      //alert('Login failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input 
        type="text" 
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={e => setPassword(e.target.value)} 
      />
      <button>Login</button>
    </form>
  );
}