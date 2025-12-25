import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../../selectors';
import { Icon } from '../../../../components';
import { Comment } from './components/comment/comment';
import { useServerRequest } from '../../../../hooks';
import { addCommentAsync, removeCommentAsync } from '../../../../actions';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const isDisabled = !userId || !(newComment ?? '').trim();

	const onNewCommentAdd = (content) => {
		dispatch(addCommentAsync(requestServer, postId, content));
		setNewComment('');
	};

	const onCommentRemove = (commentId) => {
		if (!window.confirm('Удалить комментарий?')) {
			return;
		}
		dispatch(removeCommentAsync(requestServer, commentId));
	};

	return (
		<div className={className}>
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
