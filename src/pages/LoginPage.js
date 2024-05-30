import { useState } from "react"
import { Navigate } from "react-router-dom"

export default function LoginPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [redirect, setRedirect] = useState(false)

	async function login(e){
		e.preventDefault();
		const response = await fetch('https://mern-blog-api-eight.vercel.app/login', {
			mode: 'cors',
			method: 'POST',
			body: JSON.stringify({username, password}),
			headers: {'Content-Type':'application/json'},
			credentials: 'include',
		})
		
		if (response.ok){
			alert('login successful')
			setRedirect(true)
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
