import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCheckAccess } from '../../hooks';

export const ProtectedRoute = ({ permission, children }) => {
	const location = useLocation();
	const isAllowed = useCheckAccess(permission);

	if (!isAllowed) {
		return (
			<Navigate to="/access-denied" replace state={{ from: location.pathname }} />
		);
	}

	return children;
};

ProtectedRoute.propTypes = {
	permission: PropTypes.shape({
		access: PropTypes.array.isRequired,
		ownerAllowed: PropTypes.bool,
		excludeSelf: PropTypes.bool,
	}).isRequired,
	children: PropTypes.node.isRequired,
};
