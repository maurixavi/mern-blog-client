import { Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import Editor from "../Editor"
import { API_BASE_URL } from '../config'
import { toast } from "react-hot-toast"
import { toastErrorStyles, toastSuccessStyles } from '../config';

export default function EditPost() {
	const {id} = useParams()
	const [title, setTitle] = useState('')
	const [summary, setSummary] = useState('')
	const [content, setContent] = useState('')
	const [files, setFiles] = useState('')
	const [existingImage, setExistingImage] = useState('')
	const [fileSelected, setFileSelected] = useState(true)
	const [redirect, setRedirect] = useState(false)
	
	useEffect(() => {
		fetch(`${API_BASE_URL}/post/${id}`)
			.then(response => {
				response.json().then(postInfo => {
					console.log(postInfo)
					setTitle(postInfo.title)
					setSummary(postInfo.summary)
					setContent(postInfo.content)
					setExistingImage(postInfo.cover)
				})
			})
	}, [id])

	async function updatePost(e) {
		e.preventDefault()

		if (!existingImage && !fileSelected) {
			alert('Please upload an image.')
			return
	}

		const data = new FormData()
		data.set('title', title)
		data.set('summary', summary)
		data.set('content', content)
		data.set('id', id)
		
		if (files?.[0]) {
			data.set('file', files?.[0])
		}

		const response = await fetch(`${API_BASE_URL}/post`, {
			method: 'PUT',
			body: data,
			mode: 'cors',
			credentials: 'include',
		})
		
		if (response.ok){
			toast.success('Post updated successfully!', toastSuccessStyles)
			response.json().then(userInfo => {
				setRedirect(true)
			})
			
		} else {
			toast.error('Error: Unable to update post.', toastErrorStyles)
		}
	}

	if (redirect) {
		return <Navigate to={'/post/'+id} />
	}

	return (
		<div className='edit-post-page'>
			<form onSubmit={updatePost}>
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
					onChange={e => {
						setFiles(e.target.files)
						setFileSelected(!!e.target.files.length)
				}}/>
				<Editor onChange={setContent} value={content} />
				<button style={{marginTop:'5px'}}>Update Post</button>
			</form>
		</div>
	)
}
