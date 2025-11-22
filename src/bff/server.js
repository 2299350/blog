import { getUser } from './get-user';
import { createUser } from './create-user';
import { sessions } from './sessions';

export const server = {
	async logout(session) {
		sessions.remove(session);
	},

	async autorize(authLogin, authPassword) {
		const user = await getUser(authLogin);

		if (!user) {
			return { error: 'The user has not been found', res: null };
		}

		if (user.password !== authPassword) {
			return { error: 'The password is incorrect', res: null };
		}

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				role_id: user.role_id,
				session: sessions.create(user),
			},
		};
	},

	async regicter(regLogin, regPassword) {
		const user = await getUser(regLogin);
		if (user) {
			return { error: 'This login is already taken', res: null };
		}

		await createUser(regLogin, regPassword);

		return {
			error: null,
			res: {
				id: user.id,
				login: user.login,
				role_id: user.role_id,
				session: sessions.create(user),
			},
		};
	},
};
