export const deletePost = (postId) =>
	fetch(`http://localhost:4000/posts/${postId}`, {
		method: 'DELETE',
	});
