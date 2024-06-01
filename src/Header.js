import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from './UserContext'

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch('https://mern-blog-api-eight.vercel.app/profile', {
      credentials: 'include',
      mode: "cors",
    }).then(response => {
			response.json().then(userInfo => {
				setUserInfo(userInfo);
				console.log(userInfo)
			})
		})
  }, []);

  function logout() {
    fetch('https://mern-blog-api-eight.vercel.app/logout', {
      method: 'POST',
      mode: "cors",
      credentials: 'include',
    }).then(() => {
      setUserInfo(null);
    });
  }

	const username = userInfo?.username

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
