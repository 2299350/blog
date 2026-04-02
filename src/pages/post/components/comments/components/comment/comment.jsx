import PropTypes from 'prop-types';
import { Icon } from '../../../../../../components/';
import { useCheckAccess } from '../../../../../../hooks';
import { PERMISSION } from '../../../../../../constants';
import styled from 'styled-components';

const CommentContainer = ({
	className,
	id,
	author,
	content,
	publishedAt,
	authorId,
	onDelete,
}) => {
	// Проверяем права (Админ, Модератор или Владелец)
	const isAllowed = useCheckAccess(PERMISSION.DELETE_COMMENT, authorId);

	const onCommentDelete = () => {
		// Если прав нет — клик не работает
		if (!isAllowed) return;
		onDelete(id);
	};

	return (
		<div className={className}>
			<div className="comment-block">
				<div className="information-panel">
					<div className="author">
						<Icon id="fa-user-circle-o" className="user-icon" />
						<strong>{author}</strong>
					</div>
					<div className="published-at">
						<Icon id="fa-calendar-o" className="calendar-icon" />
						<div>{publishedAt}</div>
					</div>
				</div>
				<div className="content-panel">{content}</div>
			</div>

			{/* Иконка рендерится всегда, но дизейблится классом */}
			<Icon
				id="fa-trash-o"
				size="21px"
				margin="0 0 0 10px"
				className={!isAllowed ? 'icon-disabled' : ''}
				disabled={!isAllowed}
				onClick={onCommentDelete}
			/>
		</div>
	);
};

CommentContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	author: PropTypes.string,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	authorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	onDelete: PropTypes.func.isRequired,
};

export const Comment = styled(CommentContainer)`
	margin-top: 15px;
	display: flex;
	width: 600px;
	flex-direction: row;
	justify-content: space-between;
	gap: 10px;

	.comment-block {
		padding: 6px;
		display: flex;
		flex-direction: column;
		width: 100%;
		border: 1px solid #000;
	}

	.information-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 6px;
	}

	.author,
	.published-at {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 14px;
		margin-bottom: 4px;
	}

	.content-panel {
		display: flex;
		align-items: start;
		font-size: 16px;
	}

	.icon-disabled {
		opacity: 0.4;
		color: #888;
		cursor: default;
		pointer-events: none;
	}
`;
