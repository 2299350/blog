import { sessions } from '../sessions';
import { deleteUser } from '../api';
import { PERMISSION } from '../../constants';
import { checkAccess } from '../../utils';

export const removeUserOperation = async (hash, { id }) => {
	const currentUser = await sessions.getUser(hash);

	// Сессия битая или юзер не найден
	if (!currentUser) {
		return { error: 'Access is denied', res: null };
	}

	const hasAccess = checkAccess(
		PERMISSION.DELETE_USER,
		currentUser.role_id,
		id,
		currentUser.id,
	);

	// Если юзер пытается удалить самого себя, даём нормальную ошибку
	if (currentUser.id === id) {
		return { error: 'Нельзя удалить самого себя', res: null };
	}

	// Прав нет — дальше не идём
	if (!hasAccess) {
		return { error: 'Access is denied', res: null };
	}

	try {
		await deleteUser(id);

		return {
			error: null,
			res: true,
		};
	} catch (e) {
		return {
			error: e.message || 'Не удалось удалить пользователя',
			res: null,
		};
	}
};
