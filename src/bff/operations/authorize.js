import { sessions } from '../sessions';
import { getUser } from '../api';

export const authorize = async (authLogin, authPassword) => {
	const user = await getUser(authLogin);

	if (!user) {
		return { error: 'The user has not been found', res: null };
	}

	if (user.password !== authPassword) {
		return { error: 'The password is incorrect', res: null };
	}

	const session = await sessions.create(user);

	return {
		error: null,
		res: {
			id: user.id,
			login: user.login,
			role_id: user.role_id,
			session,
		},
	};
};
