import { useSelector } from 'react-redux';
import { selectUserRole, selectUserId } from '../selectors';
import { checkAccess } from '../utils';

export const useCheckAccess = (permission, resourceOwnerId = null) => {
	const userRole = useSelector(selectUserRole);
	const userId = useSelector(selectUserId);

	return checkAccess(permission, userRole, resourceOwnerId, userId);
};
