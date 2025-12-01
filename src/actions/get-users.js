import { ACTION_TYPE } from '.';

export const getUsers = () => {
	return {
		type: ACTION_TYPE.SET_USER,
		payload: user,
	};
};
