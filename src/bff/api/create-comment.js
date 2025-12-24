import { generateDate } from '../utils';

export const createComment = async (authorId, postId, content) => {
	const res = await fetch('http://localhost:4000/comments', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json; charset=UTF-8' },
		body: JSON.stringify({
			author_id: authorId,
			post_id: postId,
			published_at: generateDate(),
			content,
		}),
	});

	if (!res.ok) {
		throw new Error(`Failed to create comment: ${res.status}`);
	}

	return res.json();
};
