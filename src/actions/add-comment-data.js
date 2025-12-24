import { ACTION_TYPE } from './action-type';

export const addCommentData = (comment) => ({
	type: ACTION_TYPE.ADD_COMMENT_DATA,
	payload: comment,
});
