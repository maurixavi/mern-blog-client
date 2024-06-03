import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { format } from 'date-fns'

export default function PostPage() {
	const [postInfo, setPostInfo] = useState(null)
	const {id} = useParams()
	useEffect(() => {
		console.log(id)
		fetch(`http://localhost:4000/post/${id}`)
			.then(response => {
				response.json().then(postInfo => {
					setPostInfo(postInfo)
					console.log(postInfo)
				})
			})
	}, [])

	if (!postInfo) return ''
	return (
		<div className='post-page'>
			<h1>{postInfo.title}</h1>
			<div className='author-time'>
					<div className="author">by {postInfo.author.username}</div>
					<div>|</div>
					<time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
			</div>
			<div className='image'>
				<img src={`http://localhost:4000/${postInfo.cover}`}></img>
			</div>
			<div dangerouslySetInnerHTML={{__html:postInfo.content}}></div>
		</div>
	)
}