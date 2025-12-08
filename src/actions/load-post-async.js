import { OPERATIONS } from '../constants';
import { setPostData } from './set-post-data';

export const loadPostAsync = (requestServer, postId) => async (dispatch) => {
	const { error, res } = await requestServer(OPERATIONS.FETCH_POST, postId);

	if (error || !res) {
		return;
	}

	dispatch(setPostData(res));
};
