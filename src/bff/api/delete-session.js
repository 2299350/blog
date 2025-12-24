export const deleteSession = async (hash) => {
	const session = await fetch(`http://localhost:4000/sessions?hash=${hash}`)
		.then((res) => res.json())
		.then(([data]) => data);

	if (session) {
		fetch(`http://localhost:4000/sessions/${session.id}`, {
			method: 'DELETE',
		});
	}
};
