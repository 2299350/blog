import { ROLE } from '../constants';
import { getPost } from '../api';
import { sessions } from '../sessions';

export const fetchPost = async (userSession, postId) => {
	// const accessRoles = [ROLE.ADMIN];
	// if (!sessions.access(userSession, accessRoles)) {
	// 	return { error: 'Access is denied', res: null };
	// }

	const post = await getPost(postId);

	return {
		error: null,
		res: post,
	};
};
