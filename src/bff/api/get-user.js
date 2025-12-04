export const getUser = async (loginToFind) =>
	fetch(`http://localhost:4000/users?login=${loginToFind}`)
		.then((res) => res.json())
		.then((users) => users[0]);
