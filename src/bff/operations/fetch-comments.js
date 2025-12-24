import { getCommentsByPostId, getUser } from '../api';

export const fetchComments = async (postId) => {
	try {
		const comments = await getCommentsByPostId(postId);

		const enriched = await Promise.all(
			(comments ?? []).map(async (comment) => {
				const user = await getUser(comment.author_id);

				return {
					...comment,
					author: user?.login ?? comment.author_id,
				};
			}),
		);

		return { error: null, res: enriched };
	} catch (e) {
		return { error: e.message || 'Failed to fetch comments', res: null };
	}
};
