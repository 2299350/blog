import { updateUser } from '../api';

export const updateUserOperation = async (user) => {
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
