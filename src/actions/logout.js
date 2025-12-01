import { ACTION_TYPE } from './action-type';
import { server } from '../bff/server';
import { clearUserFromStorage } from '../utils';

export const logout = (session) => {
	server.logout(session);
	clearUserFromStorage();
	return {
		type: ACTION_TYPE.LOGOUT,
	};
};
