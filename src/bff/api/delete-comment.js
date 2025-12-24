export const deleteComment = async (commentId) => {
	const res = await fetch(`http://localhost:4000/comments/${commentId}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Не удалось удалить комментарий');
	}

	return { id: commentId };
};
