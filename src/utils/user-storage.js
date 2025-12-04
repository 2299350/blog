const USER_KEY = 'user';

export const saveUserToStorage = (user) => {
	try {
		localStorage.setItem(USER_KEY, JSON.stringify(user));
	} catch (e) {
		console.error('Не удалось сохранить user в localStorage', e);
	}
};

export const loadUserFromStorage = () => {
	try {
		const raw = localStorage.getItem(USER_KEY);
		if (!raw) return null;

		const parsed = JSON.parse(raw);
		if (!parsed || !parsed.session) return null;

		return parsed;
	} catch (e) {
		console.error('Не удалось прочитать user из localStorage', e);
		return null;
	}
};

export const clearUserFromStorage = () => {
	try {
		localStorage.removeItem(USER_KEY);
	} catch (e) {
		console.error('Не удалось очистить user в localStorage', e);
	}
};
