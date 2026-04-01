import { getCommentsByPostId, getUserById } from '../api';

export const fetchComments = async (postId) => {
	try {
		const comments = await getCommentsByPostId(postId);

		const enriched = await Promise.all(
			(comments ?? []).map(async (comment) => {
				const user = await getUserById(comment.author_id);

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
