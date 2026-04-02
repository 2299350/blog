import { ACTION_TYPE } from '../actions';

const initialAppState = {
	logoutSwitcher: false,

	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialAppState, action) => {
	switch (action.type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				logoutSwitcher: !state.logoutSwitcher,
			};

		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...action.payload,
					isOpen: true,
				},
			};

		case ACTION_TYPE.CLOSE_MODAL:
			return {
				...state,
				modal: initialAppState.modal, // Сбрасываем только модалку, не трогая logoutSwitcher
			};

		default:
			return state;
	}
};
