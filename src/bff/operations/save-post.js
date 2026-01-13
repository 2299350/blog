import { updatePost, addPost } from '../api';
import { PERMISSION } from '../../constants';
import { sessions } from '../sessions';

export const savePost = async (hash, postData) => {
	// 1. Динамически определяем необходимые права
	// Если есть id — значит редактируем, иначе — создаем
	const accessRoles = postData.id
		? PERMISSION.EDIT_POST.access
		: PERMISSION.CREATE_POST.access;

	// 2. Проверяем доступ через сессию
	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	// 3. Выполняем действие
	const savedPost = postData.id ? await updatePost(postData) : await addPost(postData);

	return {
		error: null,
		res: savedPost,
	};
};
