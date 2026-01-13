import { OPERATIONS } from '../constants';

export const removePostAsync = (requestServer, id) => () =>
	requestServer(OPERATIONS.REMOVE_POST, id);
