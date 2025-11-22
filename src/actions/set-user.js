import { ACTION_TYPE } from '.';

export const setUser = (user) => {
	console.log('setUser user:', user);
	return {
		type: ACTION_TYPE.SET_USER,
		payload: user,
	};
};
