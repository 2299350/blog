export const getCommentsByPostId = (postId) =>
	fetch(`http://localhost:4000/comments?post_id=${postId}`).then((res) => res.json());
