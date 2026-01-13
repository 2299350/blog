import { deletePost, deleteComment, getCommentsByPostId } from '../api';
import { sessions } from '../sessions';
import { PERMISSION } from '../../constants';

export const removePost = async (hash, id) => {
	const access = await sessions.access(hash, PERMISSION.DELETE_POST.access);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	// Удаляем комментарии
	const comments = await getCommentsByPostId(id);
	await Promise.all(comments.map(({ id: commentId }) => deleteComment(commentId)));

	// Удаляем статью
	await deletePost(id);

	return {
		error: null,
		res: true,
	};
};
