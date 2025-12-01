import { generateDate } from '../utils';

export const createUser = (regLogin, regPassword) =>
	fetch('http://localhost:4000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json; charset=UTF-8',
		},
		body: JSON.stringify({
			login: regLogin,
			password: regPassword,
			registered_at: generateDate(),
			role_id: 2,
		}),
	}).then((res) => res.json());
