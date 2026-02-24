import { getPosts } from '../api';

export const fetchPosts = async () => {
	const posts = await getPosts();

	return {
		error: null,
		res: posts,
	};
};
