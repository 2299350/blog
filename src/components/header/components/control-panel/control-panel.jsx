import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, Button } from '../../../../components';
import { PERMISSION, ROLE } from '../../../../constants';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../actions';
import { useCheckAccess } from '../../../../hooks';
import { removeUserSession } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const UserBlock = styled.div`
	display: flex;
	align-items: center;
	min-height: 40px;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const role_id = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);

	const canCreatePost = useCheckAccess(PERMISSION.CREATE_POST);
	const canFetchUsers = useCheckAccess(PERMISSION.FETCH_USERS);

	const onLogout = () => {
		dispatch(logout(session));
		removeUserSession();

		// После выхода уводим на логин, если текущая страница больше недоступна
		if (
			location.pathname === '/users' ||
			location.pathname === '/post' ||
			location.pathname.includes('/edit')
		) {
			navigate('/login');
		}
	};

	return (
		<div className={className}>
			<RightAligned>
				{role_id === ROLE.GUEST ? (
					<Link to="/login">
						<Button>Войти</Button>
					</Link>
				) : (
					<UserBlock>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</UserBlock>
				)}
			</RightAligned>

			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />

				{canCreatePost && (
					<Link to="/post">
						<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
					</Link>
				)}

				{canFetchUsers && (
					<Link to="/users">
						<Icon id="fa-users" margin="10px 0 0 16px" />
					</Link>
				)}
			</RightAligned>
		</div>
	);
};

ControlPanelContainer.propTypes = {
	className: PropTypes.string,
};

export const ControlPanel = styled(ControlPanelContainer)``;
