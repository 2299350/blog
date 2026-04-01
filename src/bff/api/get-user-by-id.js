export const getUserById = async (userId) =>
	fetch(`http://localhost:4000/users?id=${userId}`)
		.then((res) => res.json())
		.then((users) => users[0]);
