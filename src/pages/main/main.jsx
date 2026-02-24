import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { OPERATIONS } from '../../constants';
import { PostCard } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer(OPERATIONS.FETCH_POSTS).then(({ res, error }) => {
			if (error) {
				console.error('Ошибка при загрузке постов:', error);
				return;
			}

			// Сортируем по убыванию даты (от новых к старым)
			const sortedPosts = res.sort((a, b) => {
				return new Date(b.published_at) - new Date(a.published_at);
			});

			setPosts(res);
		});
	}, [requestServer]);

	return (
		<div className={className}>
			<div className="post-list">
				{posts.length > 0 ? (
					posts.map((post) => (
						<PostCard
							key={post.id}
							id={post.id}
							title={post.title}
							imageUrl={post.image_url}
							publishedAt={post.published_at}
						/>
					))
				) : (
					<div className="no-posts">Статей пока нет...</div>
				)}
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	.post-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: center;
		width: 100%;
		max-width: 1000px; /* Чтобы ширина контента совпадала с остальным сайтом */
		padding: 20px 0;
	}

	.no-posts {
		font-size: 18px;
		text-align: center;
		margin-top: 40px;
	}
`;
