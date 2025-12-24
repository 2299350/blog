import { ACTION_TYPE } from './action-type';

export const setCommentsData = (comments) => ({
	type: ACTION_TYPE.SET_COMMENTS_DATA,
	payload: comments,
});
