import { OPERATIONS } from '../constants';
import { setCommentsData } from './set-comments-data';

export const loadCommentsAsync = (requestServer, postId) => async (dispatch) => {
	const commentsData = await requestServer(OPERATIONS.FETCH_COMMENTS, postId);

	// Комменты не пришли — выходим
	if (commentsData.error || !commentsData.res) {
		return;
	}

	// author уже приходит с BFF, второй раз собирать не надо
	dispatch(setCommentsData(commentsData.res));
};
