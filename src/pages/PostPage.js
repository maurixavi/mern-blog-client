import { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { UserContext } from '../UserContext'
import { API_BASE_URL } from '../config'
import { toast } from "react-hot-toast"
import { toastErrorStyles, toastSuccessStyles } from '../config'

export default function PostPage() {
	const [postInfo, setPostInfo] = useState(null);
	const { userInfo } = useContext(UserContext);
	const { id } = useParams();
	const navigate = useNavigate(); 

	useEffect(() => {
		fetch(`${API_BASE_URL}/post/${id}`)
			.then(response => response.json())
			.then(postInfo => setPostInfo(postInfo))
			.catch(error => console.error('Error fetching post:', error));
	}, [id]);

	const deletePost = async () => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			const response = await fetch(`${API_BASE_URL}/post/${id}`, {
				method: 'DELETE',
				credentials: 'include',
			});
			if (response.ok) {
				toast.success('Post successfully deleted.', toastSuccessStyles)
				navigate('/'); 
			}
		}
	};

	if (!postInfo) return '';

	return (
		<div className='post-page'>
			<h1>{postInfo.title}</h1>
			<div className='author-time'>
				<div className='author'>by {postInfo.author.username}</div>
				<div>|</div>
				<time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
			</div>
			{userInfo.id === postInfo.author._id && (
				<div className='edit-delete'>
					<Link className='edit-btn' to={`/edit/${postInfo._id}`}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='size-6'>
							<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
						</svg>
						Edit
					</Link>
					<a className='delete-btn' onClick={deletePost}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className='size-6'>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
						Delete
					</a>
				</div>
			)}
			<div className='image'>
				<img src={postInfo.cover} alt={postInfo.title}></img>
			</div>
			<div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>
		</div>
	);
}
