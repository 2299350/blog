import { getPost, getCommentsByPostId, getUsers } from '../api';

export const fetchPost = async (postId) => {
	let post;
	let error;

	try {
		post = await getPost(postId);
	} catch (postError) {
		error = postError;
	}

	if (error) {
		return {
			error: {
				code: error.code || 'REQUEST_ERROR',
				message: error.message || 'Failed to fetch post',
				status: error.status || null,
			},
			res: null,
		};
	}

	if (!post) {
		return {
			error: {
				code: 'POST_NOT_FOUND',
				message: 'Post not found',
				status: 404,
			},
			res: null,
		};
	}

	// 2. Загружаем комментарии и пользователей параллельно (для скорости)
	const [comments, users] = await Promise.all([
		getCommentsByPostId(postId),
		getUsers(),
	]);

	// 3. Превращаем ID в Логины
	// Проходимся по каждому комментарию и ищем автора в списке юзеров
	const commentsWithAuthor = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.author_id);

		return {
			...comment,
			author: user?.login || 'Unknown User', // Подставляем логин или заглушку
		};
	});

	// 4. Возвращаем пост, в который вшиты уже "красивые" комментарии
	return {
		error: null,
		res: {
			...post,
			comments: commentsWithAuthor,
		},
	};
};
