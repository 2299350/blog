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
		// Возвращаем юзера или null, если сессия не найдена
		return session?.user;
	},
};
