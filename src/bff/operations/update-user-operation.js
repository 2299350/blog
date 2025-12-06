import { updateUser } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const updateUserOperation = async (userSession, user) => {
	// 1. Кто имеет право менять роли
	const accessRoles = [ROLE.ADMIN];

	// 2. Проверка доступа по сессии
	if (!sessions.access(userSession, accessRoles)) {
		return { error: 'Access is denied', res: null };
	}

	// 3. Непосредственно обновление
	try {
		const updatedUser = await updateUser(user);

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
			error: e.message || 'Не удалось обновить пользователя',
			res: null,
		};
	}
};
