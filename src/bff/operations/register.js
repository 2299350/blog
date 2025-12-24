import { sessions } from '../sessions';
import { getUser, createUser } from '../api';

export const register = async (regLogin, regPassword) => {
	const existingUser = await getUser(regLogin);

	if (existingUser) {
		return { error: 'This login is already taken', res: null };
	}

	const newUser = await createUser(regLogin, regPassword);

	// Убираем пароль из объекта пользователя
	const { password, ...safeUser } = newUser;

	const session = await sessions.create(safeUser);

	return {
		error: null,
		res: {
			...safeUser,
			session,
		},
	};
};
