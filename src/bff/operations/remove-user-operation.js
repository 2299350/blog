import { ROLE } from '../../constants';
import { sessions } from '../sessions';
import { deleteUser } from '../api';

export const removeUserOperation = async (userSession, { id }) => {
	const accessRoles = [ROLE.ADMIN];

	if (!sessions.access(userSession, accessRoles)) {
		return { error: 'Access is denied', res: null };
	}

	try {
		await deleteUser(id);

		return {
			error: null,
			res: { id },
		};
	} catch (e) {
		return {
			error: e.message || 'Не удалось удалить пользователя',
			res: null,
		};
	}
};
