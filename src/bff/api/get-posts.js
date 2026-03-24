// Принимаем параметры пагинации и поиска
export const getPosts = (page, limit, search) => {
	// Если search есть — добавляем фильтр по заголовку, иначе пустая строка
	const searchQuery = search ? `&title_like=${search}` : '';

	// Собираем URL с параметрами и делаем запрос к json-server
	return fetch(
		`http://localhost:4000/posts?_page=${page}&_limit=${limit}&_sort=published_at&_order=desc${searchQuery}`,
	).then((response) => {
		// Общее кол-во постов подходящих под запрос (без учёта пагинации)
		// json-server кладёт это число в заголовок X-Total-Count
		const postsCount = response.headers.get('X-Total-Count');

		return response.json().then((posts) => ({ posts, postsCount }));
	});
};
