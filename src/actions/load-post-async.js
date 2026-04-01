import { OPERATIONS } from '../constants';
import { setPostData } from './set-post-data';

export const loadPostAsync = (requestServer, postId) => async (dispatch) => {
	const { error, res } = await requestServer(OPERATIONS.FETCH_POST, postId);

	if (error || !res) {
		return { error, res: null };
	}

	dispatch(setPostData(res));

	return { error: null, res };
};
