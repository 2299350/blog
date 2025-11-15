import { getUser } from './get-user';
import { createUser } from './create-user';
import { createSession } from './create-session';

export const server = {
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
			res: createSession(user.roleId),
		};
	},

	async regicter(regLogin, regPassword) {
		const user = await getUser(regLogin);
		if (user) {
			return { error: 'This login is already taken', res: null };
		}

		await createUser(regLogin, regPassword);

		return { error: null, res: createSession(user.roleId) };
	},
};
