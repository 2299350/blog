import { OPERATIONS } from '../constants';
import {
	authorize,
	logout,
	register,
	fetchRoles,
	fetchUsers,
	updateUserOperation,
	removeUserOperation,
} from './operations';

export const server = {
	[OPERATIONS.AUTHORIZE]: authorize,
	[OPERATIONS.LOGOUT]: logout,
	[OPERATIONS.REGISTER]: register,
	[OPERATIONS.FETCH_ROLES]: fetchRoles,
	[OPERATIONS.FETCH_USERS]: fetchUsers,
	[OPERATIONS.UPDATE_USER]: updateUserOperation,
	[OPERATIONS.REMOVE_USER]: removeUserOperation,
};
