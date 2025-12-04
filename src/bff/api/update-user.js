export const updateUser = async (user) => {
	const response = await fetch(`http://localhost:4000/users/${user.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	if (!response.ok) {
		throw new Error('Не удалось обновить пользователя');
	}

	return response.json();
};
