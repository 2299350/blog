import { sessions } from '../sessions';
import { getUser, createUser } from '../api';

export const register = async (regLogin, regPassword) => {
	const existingUser = await getUser(regLogin);
	if (existingUser) {
		return { error: 'This login is already taken', res: null };
	}

	const newUser = await createUser(regLogin, regPassword);
	const { password, ...safeUser } = newUser;

	return {
		error: null,
		res: {
			...safeUser,
			session: sessions.create(safeUser),
		},
	};
};
