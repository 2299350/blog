import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const UserRowContainer = ({ className, login, registered_at, role_id, roles }) => {
	const dispatch = useDispatch();
	const onRoleChange = () => {};

	return (
		<div className={className}>
			<TableRow>
				<div className="user-data">
					<div className="login-column">{login}</div>
					<div className="registered_at-column">{registered_at}</div>

					<div className="role_id-column">
						<select name="role_id" value={role_id} onChange={onRoleChange}>
							{roles.map(({ id: roleId, name: roleName }) => (
								<option key={roleId} value={roleId}>
									{roleName}
								</option>
							))}
						</select>
						<Icon
							id="fa-floppy-o"
							margin="0 0 0 10px"
							onClick={() => dispatch(/* TODO */)}
						/>
					</div>

					<Icon
						id="fa-trash-o"
						margin="0 0 0 10px"
						onClick={() => dispatch(/* TODO */)}
					/>
				</div>
			</TableRow>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
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
`;
