import { useState } from 'react';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import styled from 'styled-components';

const UserRowContainer = ({
	className,
	id,
	login,
	registered_at,
	role_id,
	roles,
	isCurrentUser,
	onRoleSave,
	onUserDelete,
}) => {
	const [currentRoleId, setCurrentRoleId] = useState(role_id);

	const onRoleChange = ({ target }) => {
		setCurrentRoleId(Number(target.value));
	};

	const isSaveDisabled = currentRoleId === role_id || isCurrentUser;
	const isDeleteDisabled = isCurrentUser;

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
							disabled={isCurrentUser}
							onChange={onRoleChange}
						>
							{roles.map(({ id: roleId, name: roleName }) => (
								<option
									key={roleId}
									value={roleId}
									disabled={Number(roleId) === 3} // запрещаем выбирать гостя
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
						disabled={isCurrentUser}
						className={isDeleteDisabled ? 'icon-disabled' : ''}
						onClick={() => {
							if (isDeleteDisabled) return;

							onUserDelete(id);
						}}
					/>
				</div>
			</TableRow>
		</div>
	);
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
