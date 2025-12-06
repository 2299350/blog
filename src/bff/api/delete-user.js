export const deleteUser = async (userId) => {
	const res = await fetch(`http://localhost:4000/users/${userId}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Не удалось удалить пользователя');
	}

	// можем вернуть просто id — нам больше ничего не надо
	return { id: userId };
};
