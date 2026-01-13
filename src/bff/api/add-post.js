import { generateDate } from '../utils';
export const addPost = ({ title, image_url, content }) =>
	fetch('http://localhost:4000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			image_url,
			content,
			published_at: generateDate(),
			comments: [],
		}),
	}).then((createdPost) => createdPost.json());
