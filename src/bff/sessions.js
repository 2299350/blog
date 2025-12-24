// 1. Загружаем базу сессий (или создаем пустую)
let savedSessions = JSON.parse(localStorage.getItem('sessions')) || {};

// 2. ХАК ДЛЯ MOCK-СЕРВЕРА:
// Восстанавливаем сессию из userData, если сервер "забыл" её после F5
const currentUser = JSON.parse(localStorage.getItem('userData'));

if (currentUser && currentUser.session && !savedSessions[currentUser.session]) {
	savedSessions[currentUser.session] = currentUser;
	localStorage.setItem('sessions', JSON.stringify(savedSessions));
}

export const sessions = {
	list: savedSessions,

	create(user) {
		const hash = Math.random().toFixed(50).toString();

		this.list[hash] = user;

		localStorage.setItem('sessions', JSON.stringify(this.list));

		return hash;
	},

	remove(hash) {
		delete this.list[hash];

		localStorage.setItem('sessions', JSON.stringify(this.list));
	},

	access(hash, accessRoles) {
		const user = this.list[hash];
		return !!user && accessRoles.includes(user.role_id);
	},
};
