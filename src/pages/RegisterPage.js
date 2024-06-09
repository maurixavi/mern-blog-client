import { useState } from "react"
import { API_BASE_URL } from '../config';
import { toast } from "react-hot-toast"
import { toastErrorStyles, toastSuccessStyles } from '../config';
import { Navigate, Link } from "react-router-dom"

export default function RegisterPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [redirect, setRedirect] = useState(false)

	async function register(e){
		e.preventDefault();
		const response = await fetch(`${API_BASE_URL}/register`, {
			method: 'POST',
			mode: "cors",
			body: JSON.stringify({username, password}),
			headers: {'Content-Type':'application/json'},
		})
		
		if (response.status === 200){
			toast.success('User registered successfully.', toastSuccessStyles);
			setRedirect(true)
		} else {
			toast.error('Registration failed. Please try again.', toastErrorStyles)
		}
	}

	if (redirect) {
		return <Navigate to={'/login'} />
	}

	return (
		<form className="register" onSubmit={register}>
			<h2>Create Account</h2>
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
			<button>Register</button>
			<div className="redirect-message">
				<p>Already have an account? <Link to="/login">Login here</Link></p>
			</div>
		</form>
	)
}
