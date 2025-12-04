import { useEffect, useState } from 'react';
import { H2, UserRow, TableRow, Content } from '../../components';
import { useServerRequest } from '../../hooks';
import { OPERATIONS } from '../../constants';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [roles, setRoles] = useState([]);
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const requestServer = useServerRequest();

	const handleRoleSave = async (id, role_id) => {
		const resp = await requestServer(OPERATIONS.UPDATE_USER, { id, role_id });

		if (resp.error) {
			console.error('[Users] handleRoleSave ERROR', resp.error);
			return;
		}

		const updatedUser = resp.res;

		setUsers((prev) =>
			prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user)),
		);
	};

	useEffect(() => {
		let isCancelled = false;

		const loadData = async () => {
			try {
				const [rolesResp, usersResp] = await Promise.all([
					requestServer(OPERATIONS.FETCH_ROLES),
					requestServer(OPERATIONS.FETCH_USERS),
				]);

				if (rolesResp.error) {
					throw new Error('Не удалось загрузить роли');
				}

				if (usersResp.error) {
					throw new Error('Не удалось загрузить список пользователей');
				}

				if (!isCancelled) {
					setRoles(rolesResp.res);
					setUsers(usersResp.res);
				}
			} catch (e) {
				if (!isCancelled) {
					setError(e.message || 'Произошла ошибка при загрузке данных');
				}
			} finally {
				if (!isCancelled) {
					setIsLoading(false);
				}
			}
		};

		loadData();

		return () => {
			isCancelled = true;
		};
	}, [requestServer]);

	return (
		<Content className={className} isLoading={isLoading} error={error}>
			<H2>Пользователи</H2>
			<div>
				<TableRow>
					<div className="login-column">Логин</div>
					<div className="date-column">Дата регистрации</div>
					<div className="role-column">Роль</div>
				</TableRow>

				{users.map(({ id, login, registered_at, role_id }) => (
					<UserRow
						key={id}
						id={id}
						login={login}
						registered_at={registered_at}
						role_id={role_id}
						roles={roles}
						onRoleSave={handleRoleSave}
					/>
				))}
			</div>
		</Content>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 600px;
	margin: 0 auto;
	font-size: 18px;

	& > div {
		width: 100%;
	}
`;
