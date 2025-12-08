export const getPost = async (postId) => {
	const res = await fetch(`http://localhost:4000/posts/${postId}`);
	const data = await res.json();
	return data;
};
