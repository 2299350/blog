import { H2, Icon } from '../../../../components';
import { useCheckAccess } from '../../../../hooks';
import { PERMISSION } from '../../../../constants';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PostContentContainer = ({
	className,
	id,
	title,
	image_url,
	content,
	published_at,
	onPostDelete,
}) => {
	const navigate = useNavigate();

	// 4. Проверяем права на редактирование и удаление поста
	// (По текущей конфигурации прав это доступно только Админу)
	const canEdit = useCheckAccess(PERMISSION.EDIT_POST);
	const canDelete = useCheckAccess(PERMISSION.DELETE_POST);

	if (!id) {
		return <div className={className}>Загрузка поста...</div>;
	}

	return (
		<div className={className}>
			<img src={image_url} alt={title} />
			<H2>{title}</H2>

			<div className="special-panel">
				<div className="special-panel-date">
					<Icon id="fa-calendar-o" className="calendar-icon" />
					<div>{published_at}</div>
				</div>
				<div className="special-panel-icons">
					<Icon
						id="fa-pencil-square-o"
						size="21px"
						disabled={!canEdit}
						className={!canEdit ? 'icon-disabled' : ''}
						onClick={() => {
							if (!canEdit) return;
							navigate(`/post/${id}/edit`);
						}}
					/>
					<Icon
						id="fa-trash-o"
						size="21px"
						disabled={!canDelete}
						className={!canDelete ? 'icon-disabled' : ''}
						onClick={() => {
							if (!canDelete) return;
							onPostDelete(id);
						}}
					/>
				</div>
			</div>
			<div className="text-content" dangerouslySetInnerHTML={{ __html: content }} />
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	width: 100%;

	img {
		display: block;
		max-width: 300px;
		height: auto;
		float: left;
		margin: 0 20px 20px 0;
	}

	.icon-disabled {
		opacity: 0.4;
		color: #888;
		cursor: default;
		pointer-events: none;
	}

	.special-panel {
		width: auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px; /* Добавил небольшой отступ снизу панели */
	}

	.special-panel-icons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}

	.special-panel-date {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-size: 18px;
	}

	.calendar-icon {
		cursor: default;
	}

	H2 {
		margin-top: 0;
		margin-bottom: 10px;
	}

	.text-content {
		white-space: pre-line;
		font-size: 18px;
	}
`;
