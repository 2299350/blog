import { useState } from 'react';
import { Icon } from '../../../../components';
import { Comment } from './components/comment/comment';
import styled from 'styled-components';

const CommentsContainer = ({ className, postId }) => {
	const [newComment, setNewComment] = useState('');
	const isDisabled = false;

	const onNewCommentAdd = (postId, text) => {
		console.log('Adding new comment to post:', postId, 'Comment:', text);
		setNewComment('');
	};

	const comments = [
		{
			id: 1,
			author: 'Иван Иванов',
			content:
				'Отличный пост! Очень информативно. Отличный пост! Очень информативно. Отличный пост! Очень информативно. Отличный пост! Очень информативно.',
			published_at: '2024-06-01',
		},
	];

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

						onNewCommentAdd(postId, newComment);
					}}
				/>
			</div>

			<div className="comments">
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						id={comment.id}
						author={comment.author}
						content={comment.content}
						publishedAt={comment.published_at}
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
