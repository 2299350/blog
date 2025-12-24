import { getPost, createComment, getUser } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const addComment = async (userSession, authorId, postId, content) => {
	// const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	// if (!sessions.access(userSession, accessRoles)) {
	// 	return { error: 'Access is denied', res: null };
	// }

	const text = (content ?? '').trim();
	if (!text) return { error: 'Comment is empty', res: null };

	const post = await getPost(postId);
	if (!post) return { error: 'This post has not been found', res: null };

	try {
		const [newComment, user] = await Promise.all([
			createComment(authorId, postId, text),
			getUser(authorId),
		]);

		return {
			error: null,
			res: {
				...newComment,
				author: user?.login ?? authorId,
			},
		};
	} catch (e) {
		return { error: e.message || 'Failed to create comment', res: null };
	}
};
