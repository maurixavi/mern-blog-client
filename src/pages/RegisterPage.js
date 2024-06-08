import { useState } from "react"
import { API_BASE_URL } from '../config';
import { toast } from "react-hot-toast"
import { toastErrorStyles, toastSuccessStyles } from '../config';

export default function RegisterPage() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	async function register(e){
		e.preventDefault();
		const response = await fetch(`${API_BASE_URL}/register`, {
			method: 'POST',
			mode: "cors",
			body: JSON.stringify({username, password}),
			headers: {'Content-Type':'application/json'},
		})
		
		if (response.status === 200){
			toast.success('User logged in successfully.', toastSuccessStyles);
		} else {
			toast.error('Registration failed. Please try again.', toastErrorStyles)
		}
	}

	return (
		<form className="register" onSubmit={register}>
			<h1>Register</h1>
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
			<button>Register </button>
		</form>
	)
}
