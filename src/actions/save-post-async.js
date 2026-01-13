import { setPostData } from './set-post-data';

export const savePostAsync = (requestServer, postData) => async (dispatch) => {
	const result = await requestServer('savePost', postData);

	if (result.res) {
		dispatch(setPostData(result.res));
	}

	return result.res;
};
