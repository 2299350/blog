import { OPERATIONS } from '../constants';
import { setCommentsData } from './set-comments-data';

export const loadCommentsAsync = (requestServer, postId) => async (dispatch) => {
	// 1. Запрашиваем и комментарии, и пользователей
	const [commentsData, usersData] = await Promise.all([
		requestServer(OPERATIONS.FETCH_COMMENTS, postId),
		requestServer(OPERATIONS.FETCH_USERS),
	]);

	// Если хотя бы один запрос упал или нет данных — выходим
	if (commentsData.error || usersData.error || !commentsData.res || !usersData.res) {
		return;
	}

	const comments = commentsData.res;
	const users = usersData.res;

	// 2. Объединяем: заменяем author_id на author (login)
	const commentsWithAuthor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.author_id);

		return {
			...comment,
			author: user?.login || comment.author_id, // Подставляем логин, если нашли
		};
	});

	// 3. Отправляем в Redux уже "красивые" данные
	dispatch(setCommentsData(commentsWithAuthor));
};
