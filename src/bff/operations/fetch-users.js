import { getUsers } from '../api';
import { sessions } from '../sessions';
import { PERMISSION } from '../../constants';
import { checkAccess } from '../../utils';

export const fetchUsers = async (userSession) => {
	const currentUser = await sessions.getUser(userSession);

	// Сессия битая или юзер не найден
	if (!currentUser) {
		return { error: 'Access is denied', res: null };
	}

	const hasAccess = checkAccess(
		PERMISSION.FETCH_USERS,
		currentUser.role_id,
		null,
		currentUser.id,
	);

	// Прав нет — дальше не идём
	if (!hasAccess) {
		return { error: 'Access is denied', res: null };
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
