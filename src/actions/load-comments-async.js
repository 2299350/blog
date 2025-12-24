import { OPERATIONS } from '../constants';
import { setCommentsData } from './set-comments-data';

export const loadCommentsAsync = (requestServer, postId) => async (dispatch) => {
	const { error, res } = await requestServer(OPERATIONS.FETCH_COMMENTS, postId);

	if (error || !res) {
		return;
	}

	dispatch(setCommentsData(res));
};
