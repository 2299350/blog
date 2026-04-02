import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useCheckAccess } from '../../../../hooks';
import { PERMISSION, ROLE } from '../../../../constants';
import styled from 'styled-components';

const UserRowContainer = ({
	className,
	id,
	login,
	registered_at,
	role_id,
	roles,
	onRoleSave,
	onUserDelete,
}) => {
	const [currentRoleId, setCurrentRoleId] = useState(role_id);

	// СИНХРОНИЗАЦИЯ: Если проп изменился (например, после сохранения), обновляем стейт
	useEffect(() => {
		setCurrentRoleId(role_id);
	}, [role_id]);

	// 1. Проверяем права на действия с ЭТИМ пользователем (передаем id)
	const canUpdateRole = useCheckAccess(PERMISSION.UPDATE_USER_ROLE, id);
	const canDeleteUser = useCheckAccess(PERMISSION.DELETE_USER, id);

	const onRoleChange = ({ target }) => {
		setCurrentRoleId(Number(target.value));
	};

	// 2. Блокируем кнопку, если нет прав ИЛИ роль не изменилась
	const isSaveDisabled = !canUpdateRole || currentRoleId === role_id;

	return (
		<div className={className}>
			<TableRow>
				<div className="user-data">
					<div className="login-column">{login}</div>
					<div className="registered_at-column">{registered_at}</div>

					<div className="role_id-column">
						<select
							name="role_id"
							value={currentRoleId}
							disabled={!canUpdateRole}
							onChange={onRoleChange}
						>
							{roles.map(({ id: roleId, name: roleName }) => (
								<option
									key={roleId}
									value={roleId}
									disabled={Number(roleId) === ROLE.GUEST}
								>
									{roleName}
								</option>
							))}
						</select>

						<Icon
							id="fa-floppy-o"
							margin="0 0 0 10px"
							disabled={isSaveDisabled}
							className={isSaveDisabled ? 'icon-disabled' : ''}
							onClick={() => {
								if (isSaveDisabled) return;
								onRoleSave(id, currentRoleId);
							}}
						/>
					</div>

					<Icon
						id="fa-trash-o"
						margin="0 0 0 10px"
						disabled={!canDeleteUser}
						className={!canDeleteUser ? 'icon-disabled' : ''}
						onClick={() => {
							if (!canDeleteUser) return;
							onUserDelete(id);
						}}
					/>
				</div>
			</TableRow>
		</div>
	);
};

UserRowContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	login: PropTypes.string.isRequired,
	registered_at: PropTypes.string.isRequired,
	role_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	roles: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			name: PropTypes.string.isRequired,
		}),
	).isRequired,
	onRoleSave: PropTypes.func.isRequired,
	onUserDelete: PropTypes.func.isRequired,
};

export const UserRow = styled(UserRowContainer)`
	border: 1px solid #000;
	padding: 8px 0;
	margin-top: 10px;
	.user-data {
		display: flex;
		align-items: center;
	}

	.login-column {
		width: 200px;
	}

	.registered_at-column {
		width: 200px;
	}

	.role_id-column {
		width: 200px;
		display: flex;
	}

	.icon-disabled {
		opacity: 0.4;
		color: #888;
		cursor: default;
		pointer-events: none;
	}
`;
