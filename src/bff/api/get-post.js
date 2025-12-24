export const getPost = async (postId) => {
	const res = await fetch(`http://localhost:4000/posts/${postId}`);

	if (!res.ok) {
		return null;
	}

	return res.json();
};
