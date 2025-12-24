import { Link, useNavigate } from 'react-router-dom';
import { Icon, Button } from '../../../../components';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../../constants';
import {
	selectUserRole,
	selectUserLogin,
	selectUserSession,
} from '../../../../selectors';
import { useDispatch } from 'react-redux';
import { logout } from '../../../../actions';
import { removeUserSession } from '../../../../utils';
import styled from 'styled-components';

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
	const role_id = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const dispatch = useDispatch();
	const session = useSelector(selectUserSession);

	const onLogout = () => {
		dispatch(logout(session));
		removeUserSession();
	};

	return (
		<div className={className}>
			<RightAligned>
				{role_id === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<UserBlock>
						<UserName>{login}</UserName>
						<Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
					</UserBlock>
				)}
			</RightAligned>
			<RightAligned>
				<Icon id="fa-backward" margin="10px 0 0 0" onClick={() => navigate(-1)} />

				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 0 0 16px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 16px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	/* Add styles for ControlPanel here if needed */
`;
