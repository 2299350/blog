import { getPosts, getComments } from '../api';

export const fetchPosts = async (page, limit, search) => {
	// Ждем, пока база данных отдаст нам и посты, и вообще все комменты
	const [{ posts, postsCount }, comments] = await Promise.all([
		getPosts(page, limit, search),
		getComments(),
	]);

	return {
		error: null,
		// Пробегаемся по постам и приклеиваем счетчик
		res: posts.map((post) => ({
			...post,
			commentsCount: comments.filter(
				// Ищем комменты, у которых post_id совпадает с id текущей статьи
				(comment) => comment.post_id === post.id,
			).length,
		})),
		// Приходит строкой из заголовка, Number() превращает в число
		postsCount: Number(postsCount),
	};
};
