import { removeComment } from './remove-comment';
import { OPERATIONS } from '../constants';

export const removeCommentAsync = (requestServer, id) => async (dispatch) => {
	// 1. Получаем ответ от сервера
	const { error, res } = await requestServer(OPERATIONS.REMOVE_COMMENT, id);

	// 2. Если есть ошибка или нет результата — ПРЕРЫВАЕМСЯ.
	// Не удаляем из Redux, если сервер не разрешил.
	if (error || !res) {
		return;
	}

	// 3. Если всё ок — обновляем стейт
	dispatch(removeComment(id));
};
