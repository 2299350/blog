import { OPERATIONS } from '../constants';
import {
	authorize,
	logout,
	register,
	fetchRoles,
	fetchUsers,
	updateUserOperation,
	removeUserOperation,
	fetchPost,
	addComment,
	fetchComments,
	removeComment,
	savePost,
	removePost,
} from './operations';

export const server = {
	[OPERATIONS.AUTHORIZE]: authorize,
	[OPERATIONS.LOGOUT]: logout,
	[OPERATIONS.REGISTER]: register,
	[OPERATIONS.FETCH_ROLES]: fetchRoles,
	[OPERATIONS.FETCH_USERS]: fetchUsers,
	[OPERATIONS.UPDATE_USER]: updateUserOperation,
	[OPERATIONS.REMOVE_USER]: removeUserOperation,
	[OPERATIONS.FETCH_POST]: fetchPost,
	[OPERATIONS.ADD_COMMENT]: addComment,
	[OPERATIONS.FETCH_COMMENTS]: fetchComments,
	[OPERATIONS.REMOVE_COMMENT]: removeComment,
	[OPERATIONS.SAVE_POST]: savePost,
	[OPERATIONS.REMOVE_POST]: removePost,
};
