import { sessions } from '../sessions';
import { getComment, deleteComment } from '../api';
import { PERMISSION } from '../../constants';
import { checkAccess } from '../../utils';

export const removeComment = async (hash, id) => {
	const currentUser = await sessions.getUser(hash);

	// Сессия битая или юзер не найден
	if (!currentUser) {
		return { error: 'Access is denied', res: null };
	}

	const comment = await getComment(id);

	// Коммент не нашли — удалять нечего
	if (!comment) {
		return { error: 'Comment is not found', res: null };
	}

	const hasAccess = checkAccess(
		PERMISSION.DELETE_COMMENT,
		currentUser.role_id,
		comment.author_id,
		currentUser.id,
	);

	// Ни роль не подходит, ни это его коммент
	if (!hasAccess) {
		return { error: 'Access is denied', res: null };
	}

	await deleteComment(id);

	return {
		error: null,
		res: true,
	};
};
