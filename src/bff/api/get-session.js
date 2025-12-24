export const getSession = async (hash) =>
	fetch(`http://localhost:4000/sessions?hash=${hash}`)
		.then((loadedSession) => loadedSession.json())
		.then(([loadedSession]) => loadedSession);
