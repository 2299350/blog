// Принимаем объект и сразу деструктурируем его
export const updateUser = async ({ id, role_id }) => {
	const response = await fetch(`http://localhost:4000/users/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			role_id,
		}),
	});

	if (!response.ok) {
		throw new Error('Не удалось обновить пользователя');
	}

	return response.json();
};
