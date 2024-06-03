import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('https://mern-blog-api-eight.vercel.app/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUserInfo(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
    }
  }, [setUserInfo]);

  function logout() {
    localStorage.removeItem('token'); // Eliminar el token de localStorage
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">My Blog</Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Write</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}