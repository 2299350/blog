import { getRoles } from '../api';
import { sessions } from '../sessions';
import { PERMISSION } from '../../constants';

export const fetchRoles = async (hash) => {
	// 1. Берем права из правила "Обновление роли"
	// если ты можешь менять роли, ты должен видеть их список
	const { access } = PERMISSION.UPDATE_USER_ROLE;

	// 2. Идем в базу за пользователем
	const user = await sessions.getUser(hash);

	// 3. Проверяем: пользователь существует? есть ли у него права?
	if (!user || !access.includes(user.role_id)) {
		return { error: 'Access is denied', res: null };
	}

	// 4. Загружаем роли
	const roles = await getRoles();

	return {
		error: null,
		res: roles,
	};
};
