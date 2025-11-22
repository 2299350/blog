import { ACTION_TYPE } from '../actions';

const initialAppState = {
	logoutSwitcher: false,
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT: {
			return {
				...state,
				logoutSwitcher: !state.logoutSwitcher,
			};
		}
		default:
			return state;
	}
};
