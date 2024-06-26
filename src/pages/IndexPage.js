import Post from "../Post"
import { useEffect, useState } from 'react'
import { API_BASE_URL } from '../config';

export default function IndexPage() {
	const [posts, setPosts] = useState([])

  useEffect(() => { 
    fetch(`${API_BASE_URL}/post`).then(response => {
      response.json().then(posts => {
        //console.log(posts)
				setPosts(posts)
      })
    })
  }, [])

	return (
		<>
			{posts.length > 0 && posts.map(post => (
				<Post {...post} />
			))}
		</>
	)
}
