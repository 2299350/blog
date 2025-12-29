import { getUsers } from '../api';
import { sessions } from '../sessions';
import { PERMISSION } from '../../constants';

export const fetchUsers = async (userSession) => {
	const { access } = PERMISSION.FETCH_USERS;

	if (!sessions.access(userSession, access)) {
		return { error: 'Access is denied', res: null };
	}

	const users = await getUsers();

	return {
		error: null,
		res: users,
	};
};
