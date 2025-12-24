export const getComment = async (id) => {
	const res = await fetch(`http://localhost:4000/comments/${id}`);

	if (!res.ok) {
		if (res.status === 404) {
			return null;
		}
		throw new Error('Ошибка при получении комментария');
	}

	return await res.json();
};
