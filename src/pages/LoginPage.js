import { useState, useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from '../UserContext'
import { API_BASE_URL } from '../config';

export default function LoginPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [redirect, setRedirect] = useState(false)
	const {setUserInfo} = useContext(UserContext)

	async function login(e){
		e.preventDefault();
		const response = await fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({username, password}),
			headers: {'Content-Type':'application/json'},
			credentials: 'include', //Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.
		})
		
		if (response.ok){
			alert('login successful')
			response.json().then(userInfo => {
				setUserInfo(userInfo)
				setRedirect(true)
			})
			
		} else {
			alert('login failed')
		}

	}

	if (redirect) {
		return <Navigate to={'/'} />
	}

	return (
		<form className="login" onSubmit={login}>
			<h1>Login</h1>
			<input 
				type="text" 
				placeholder="Username"
				value={username}
				onChange={e => setUsername(e.target.value)} />
			<input 
				type="password" 
				placeholder="Password" 
				value={password}
				onChange={e => setPassword(e.target.value)} />
			<button>Login</button>
		</form>
	)
}
