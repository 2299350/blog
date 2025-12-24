import { getPost } from '../api';

export const fetchPost = async (postId) => {
	try {
		const post = await getPost(postId);

		if (!post) {
			return { error: 'Post not found', res: null };
		}

		return {
			error: null,
			res: post,
		};
	} catch (e) {
		return { error: e.message || 'Failed to fetch post', res: null };
	}
};
