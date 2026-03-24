import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon id="fa-calendar-o" margin="0 7px 0 0" size="18px" />
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon id="fa-comment-o" margin="0 7px 0 0" size="18px" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 280px;
	border: 1px solid #000;
	background-color: #fff;
	transition: transform 0.2s;

	&:hover {
		transform: translateY(-5px);
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	img {
		width: 100%;
		height: 150px;
		object-fit: cover;
		border-bottom: 1px solid #000;
	}

	.post-card-footer {
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100px;
	}

	h4 {
		margin: 0;
		font-size: 18px;
	}

	.post-card-info {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.published-at,
	.comments-count {
		display: flex;
		align-items: center;
		font-size: 14px;
	}
`;
