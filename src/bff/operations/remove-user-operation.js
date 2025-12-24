import { sessions } from '../sessions';
import { deleteUser } from '../api';
import { PERMISSION } from '../../constants'; // Импортируем конфиг

export const removeUserOperation = async (hash, { id }) => {
	// 1. Достаем правила для удаления пользователя
	const { access, excludeSelf } = PERMISSION.DELETE_USER;

	// 2. Получаем сессию пользователя (нам нужен сам объект юзера, чтобы сверить ID)
	const user = await sessions.getUser(hash);

	// Если сессии нет — выход
	if (!user) {
		return { error: 'Access is denied', res: null };
	}

	// 3. ПРОВЕРКА РОЛИ: Есть ли роль пользователя в списке разрешенных?
	// (например, является ли он Админом)
	if (!access.includes(user.role_id)) {
		return { error: 'Access is denied', res: null };
	}

	// 4. ПРОВЕРКА SELF: Пытается ли он удалить сам себя?
	// Если правило excludeSelf включено И id удаляемого совпадает с id текущего
	if (excludeSelf && user.id === id) {
		return { error: 'Нельзя удалить самого себя', res: null };
	}

	// 5. Если все проверки пройдены — удаляем
	try {
		await deleteUser(id);

		return {
			error: null,
			res: true,
		};
	} catch (e) {
		return {
			error: e.message || 'Не удалось удалить пользователя',
			res: null,
		};
	}
};
