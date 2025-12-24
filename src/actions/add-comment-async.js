import { OPERATIONS } from '../constants';
import { addCommentData } from './add-comment-data';

export const addCommentAsync =
	(requestServer, authorId, postId, content) => async (dispatch) => {
		const { error, res } = await requestServer(
			OPERATIONS.ADD_COMMENT,
			authorId,
			postId,
			content,
		);

		if (error || !res) {
			return;
		}

		dispatch(addCommentData(res));
	};
