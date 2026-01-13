export const updatePost = ({ id, title, image_url, content }) =>
	fetch(`http://localhost:4000/posts/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			image_url,
			content,
		}),
	}).then((loadedPost) => loadedPost.json());
