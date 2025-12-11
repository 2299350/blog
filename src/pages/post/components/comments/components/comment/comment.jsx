import { Icon } from '../../../../../../components/';
import styled from 'styled-components';

const CommentContainer = ({ className, id, author, content, publishedAt }) => {
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
			<Icon
				id="fa-trash-o"
				size="21px"
				// disabled={isDisabled}
				// className={isDisabled ? 'icon-disabled' : ''}
				// onClick={() => {
				// 	if (isDisabled) return;

				// 	// onUserDelete(id);
				// }}
			/>
		</div>
	);
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
`;
