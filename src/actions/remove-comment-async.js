import { removeComment } from './remove-comment';
import { OPERATIONS } from '../constants';

export const removeCommentAsync = (requestServer, id) => async (dispatch) => {
	await requestServer(OPERATIONS.REMOVE_COMMENT, id);
	dispatch(removeComment(id));
};
