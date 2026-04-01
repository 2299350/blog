const createError = (message, code, status) => {
	const error = new Error(message);
	error.code = code;
	error.status = status;
	return error;
};

export const getPost = async (postId) => {
	const res = await fetch(`http://localhost:4000/posts/${postId}`);

	if (res.ok) {
		return res.json();
	}

	if (res.status === 404) {
		throw createError('Post not found', 'POST_NOT_FOUND', 404);
	}

	throw createError('Request error', 'REQUEST_ERROR', res.status);
};
