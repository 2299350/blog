import { updateUser } from '../api';
import { sessions } from '../sessions';
import { PERMISSION } from '../../constants';
import { checkAccess } from '../../utils';

export const updateUserOperation = async (hash, { id, role_id }) => {
	const currentUser = await sessions.getUser(hash);

	// Сессия битая или юзер не найден
	if (!currentUser) {
		return { error: 'Access is denied', res: null };
	}

	const hasAccess = checkAccess(
		PERMISSION.UPDATE_USER_ROLE,
		currentUser.role_id,
		id,
		currentUser.id,
	);

	// Если юзер пытается менять самого себя, даём нормальную ошибку
	if (currentUser.id === id) {
		return { error: 'Нельзя изменить роль самому себе', res: null };
	}

	// Прав нет — дальше не идём
	if (!hasAccess) {
		return { error: 'Access is denied', res: null };
	}

	try {
		const updatedUser = await updateUser({ id, role_id });

		return {
			error: null,
			res: {
				id: updatedUser.id,
				login: updatedUser.login,
				role_id: updatedUser.role_id,
			},
		};
	} catch (e) {
		return {
			error: e.message || 'Не удалось обновить роль пользователя',
			res: null,
		};
	}
};
