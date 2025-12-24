import { sessions } from '../sessions';
import { getComment, deleteComment } from '../api';
import { PERMISSION } from '../../constants'; // <--- Берем правила из конфига

export const removeComment = async (hash, id) => {
	const currentUser = sessions.list[hash];

	if (!currentUser) {
		return { error: 'Access is denied', res: null };
	}

	const comment = await getComment(id);

	if (!comment) {
		return { error: 'Comment is not found', res: null };
	}

	// 1. Достаем правила из твоего файла permissions.js
	const { access, ownerAllowed } = PERMISSION.DELETE_COMMENT;

	// 2. Проверяем роль (Админ или Модератор)
	const hasRole = access.includes(currentUser.role_id);

	// 3. Проверяем авторство (Владелец)
	const isOwner = ownerAllowed && String(currentUser.id) === String(comment.author_id);

	// Если ни роль не подходит, ни авторство — выкидываем
	if (!hasRole && !isOwner) {
		return { error: 'Access is denied', res: null };
	}

	await deleteComment(id);

	return {
		error: null,
		res: true,
	};
};
