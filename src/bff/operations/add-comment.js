import { getPost, createComment } from '../api';
import { sessions } from '../sessions';
import { PERMISSION } from '../../constants';

export const addComment = async (userSession, { postId, content }) => {
	// 1. Правила доступа
	const { access } = PERMISSION.CREATE_COMMENT;

	// 2. Получаем пользователя по сессии
	const user = await sessions.getUser(userSession);

	// Если пользователя нет или у него нет прав
	if (!user || !access.includes(user.role_id)) {
		return { error: 'Access is denied', res: null };
	}

	// 3. Валидация текста
	const text = (content ?? '').trim();
	if (!text) return { error: 'Comment is empty', res: null };

	// 4. Проверка существования поста
	const post = await getPost(postId);
	if (!post) return { error: 'This post has not been found', res: null };

	try {
		// 5. Создание комментария
		// ВАЖНО: Мы берем user.id из сессии, а не верим присланному authorId.
		// Это защита от подмены автора.
		const newComment = await createComment(user.id, postId, text);

		return {
			error: null,
			res: {
				...newComment,
				author: user.login,
			},
		};
	} catch (e) {
		return { error: e.message || 'Failed to create comment', res: null };
	}
};
