import { Navigate } from "react-router-dom"
import { useState } from "react"
import Editor from "../Editor"
import { API_BASE_URL } from '../config';
import { toast } from "react-hot-toast"
import { toastErrorStyles, toastSuccessStyles } from '../config';

export default function CreatePost() {
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [content, setContent] = useState('')
	const [files, setFiles] = useState('')
	const [redirect, setRedirect] = useState(false)

	async function createNewPost(e) {
		e.preventDefault();

		if (!files.length) {
			alert('Please upload an image.');
			return;
		}

		const data = new FormData()
		data.set('title', title)
		data.set('summary', summary)
		data.set('content', content)
		if (files?.[0]) {
			data.set('file', files?.[0])
		}

		const response = await fetch(`${API_BASE_URL}/post`, {
			method: 'POST',
			mode: 'cors',
			body: data, 
			credentials: 'include',
		})

		if (response.ok){
			toast.success('Post created successfully!', toastSuccessStyles)
			response.json().then(userInfo => {
				setRedirect(true)
			})
			
		} else {
			toast.error('Error: Unable to create post.', toastErrorStyles)
		}
	}

	if (redirect) {
		return <Navigate to={'/'} />
	}

	return (
		<div className='create-post-page'>
			<form onSubmit={createNewPost}>
				<input 
					type="title" 
					placeholder={'Title'}
					value={title}
					onChange={e => setTitle(e.target.value)}/>
				<input 
					type="summary" 
					placeholder={'Summary'}
					value={summary}
					onChange={e => setSummary(e.target.value)}/>
				<input 
					type="file"	
					onChange={e => setFiles(e.target.files)}/>
				<Editor onChange={setContent} value={content} />
				<button style={{marginTop:'5px'}}>Create Post</button>
			</form>
		</div>
	)
}