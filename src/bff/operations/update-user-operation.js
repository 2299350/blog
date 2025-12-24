import { updateUser } from '../api';
import { sessions } from '../sessions';
import { PERMISSION } from '../../constants';

export const updateUserOperation = async (hash, { id, role_id }) => {
	const { access, excludeSelf } = PERMISSION.UPDATE_USER_ROLE;

	const currentUser = await sessions.getUser(hash);

	if (!currentUser) {
		return { error: 'Access is denied', res: null };
	}

	if (!access.includes(currentUser.role_id)) {
		return { error: 'Access is denied', res: null };
	}

	if (excludeSelf && currentUser.id === id) {
		return { error: 'Нельзя изменить роль самому себе', res: null };
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
