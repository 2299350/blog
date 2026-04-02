import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components/comment/comment';
import { useCheckAccess, useServerRequest } from '../../../../hooks';
import { PERMISSION } from '../../../../constants';
import {
	addCommentAsync,
	removeCommentAsync,
	openModal,
	closeModal,
} from '../../../../actions';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	// Право на создание коммента проверяем через общий конфиг прав
	const canAddComment = useCheckAccess(PERMISSION.CREATE_COMMENT);
	const isDisabled = !(newComment ?? '').trim();

	const onNewCommentAdd = (content) => {
		dispatch(addCommentAsync(requestServer, postId, content));
		setNewComment('');
	};

	const onCommentRemove = (commentId) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, commentId));
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	return (
		<div className={className}>
			{canAddComment && (
				<div className="new-comment">
					<textarea
						name="new-comment"
						placeholder="Введите ваш комментарий..."
						rows={5}
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
					/>
					<Icon
						id="fa-paper-plane-o"
						size="21px"
						disabled={isDisabled}
						className={isDisabled ? 'icon-disabled' : ''}
						onClick={() => {
							if (isDisabled) return;
							onNewCommentAdd(newComment);
						}}
					/>
				</div>
			)}

			<div className="comments">
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						id={comment.id}
						author={comment.author}
						authorId={comment.author_id}
						content={comment.content}
						publishedAt={comment.published_at}
						onDelete={onCommentRemove}
					/>
				))}
			</div>
		</div>
	);
};

CommentsContainer.propTypes = {
	className: PropTypes.string,
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
			author: PropTypes.string,
			author_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
			content: PropTypes.string.isRequired,
			published_at: PropTypes.string.isRequired,
		}),
	).isRequired,
	postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export const Comments = styled(CommentsContainer)`
	display: flex;
	flex-direction: column;
	width: 600px;
	margin-top: 20px;

	.new-comment {
		display: flex;
		align-items: start;
		gap: 10px;
	}

	.new-comment > textarea {
		width: 100%;
		font-size: 16px;
		padding: 6px;
	}

	.icon-disabled {
		opacity: 0.4;
		color: #888;
		cursor: default;
		pointer-events: none;
	}
`;
