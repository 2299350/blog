import { ACTION_TYPE } from '../actions';

const initialPostState = {
	id: '',
	title: '',
	image_url: '',
	content: '',
	published_at: '',
	comments: [],
};

export const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		// 1. Когда обновляем данные СТАТЬИ, защищаем существующие комментарии
		case ACTION_TYPE.SET_POST_DATA:
			return {
				...state,
				...action.payload,
				comments: state.comments,
			};

		// 2. Когда приходят КОММЕНТАРИИ, мы кладем их в стейт
		case ACTION_TYPE.SET_COMMENTS_DATA:
			return {
				...state,
				comments: action.payload ?? [],
			};

		case ACTION_TYPE.ADD_COMMENT_DATA:
			return {
				...state,
				comments: [...(state.comments ?? []), action.payload],
			};

		case ACTION_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== action.payload,
				),
			};

		case ACTION_TYPE.RESET_POST_DATA:
			return initialPostState;

		default:
			return state;
	}
};
