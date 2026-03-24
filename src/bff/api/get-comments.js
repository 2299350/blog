export const getComments = () =>
	fetch('http://localhost:4000/comments').then((res) => res.json());
