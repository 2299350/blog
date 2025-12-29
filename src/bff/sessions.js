import { addSession, deleteSession, getSession } from './api';

export const sessions = {
	async create(user) {
		const hash = Math.random().toFixed(50).toString();
		await addSession(hash, user);
		return hash;
	},

	async remove(hash) {
		await deleteSession(hash);
	},

	async access(hash, accessRoles) {
		const session = await getSession(hash);
		return !!session?.user && accessRoles.includes(session.user.role_id);
	},

	async getUser(hash) {
		const session = await getSession(hash);

		if (!session?.user) {
			return null;
		}

		// Деструктуризация: вытаскиваем password в отдельную переменную,
		// а всё остальное собираем в userWithoutPassword
		const { password, ...userWithoutPassword } = session.user;

		// Возвращаем объект БЕЗ пароля
		return userWithoutPassword;
	},
};
