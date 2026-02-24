export const getPosts = () =>
	fetch('http://localhost:4000/posts').then((loadedPosts) => loadedPosts.json());
