import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { UserContext } from './UserContext'
import { API_BASE_URL } from './config';

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch(`${API_BASE_URL}/profile`, {
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
    fetch(`${API_BASE_URL}/logout`, {
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
      <Link to="/" className="logo">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 22" stroke-width="2" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
      </svg>
        Eclectic Insights
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 -6 28 28" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
          </svg>
  
              Write
            </Link>
            <a onClick={logout}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="2 -6 28 28" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
            </svg>
              Logout
            </a>
          </>
        ) : (
          <>
            <Link to="/register" className="register-btn">Register</Link>
            <Link to="/login" className="login-btn">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
