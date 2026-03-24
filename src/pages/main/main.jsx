import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { OPERATIONS } from '../../constants';
import { PostCard, Search, Pagination } from './components';
import styled from 'styled-components';

const POSTS_PER_PAGE = 6;

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [totalPostsCount, setTotalPostsCount] = useState(0); // общее кол-во постов с сервера
	const [currentPage, setCurrentPage] = useState(1); // текущая страница
	const [search, setSearch] = useState(''); // строка поиска
	const [searchValue, setSearchValue] = useState(''); // то что юзер видит в инпуте

	const requestServer = useServerRequest();

	const pageCount = Math.max(1, Math.ceil(totalPostsCount / POSTS_PER_PAGE));

	// debounce — следит за вводом и с задержкой обновляет search
	useEffect(() => {
		// запускаем таймер на 2 секунды
		const timeout = setTimeout(() => {
			setSearch(searchValue);
			setCurrentPage(1); // сбрасываем страницу на 1 при новом поиске
		}, 2000);

		// если searchValue изменился раньше чем прошло 2 сек —
		// отменяем предыдущий таймер и запускаем новый
		return () => clearTimeout(timeout);
	}, [searchValue]);

	// запрос срабатывает когда search или currentPage изменились
	useEffect(() => {
		requestServer(OPERATIONS.FETCH_POSTS, currentPage, POSTS_PER_PAGE, search).then(
			({ res, error, postsCount }) => {
				if (error) {
					console.error('Ошибка при загрузке постов:', error);
					return;
				}

				setPosts(res);
				setTotalPostsCount(postsCount);
			},
		);
	}, [requestServer, currentPage, search]);

	return (
		<div className={className}>
			<Search searchValue={searchValue} onChange={setSearchValue} />

			<div className="post-list">
				{posts.length > 0 ? (
					posts.map((post) => (
						<PostCard
							key={post.id}
							id={post.id}
							title={post.title}
							imageUrl={post.image_url}
							publishedAt={post.published_at}
							commentsCount={post.commentsCount}
						/>
					))
				) : (
					<div className="no-posts">Статей пока нет...</div>
				)}
			</div>

			<Pagination
				currentPage={currentPage}
				pageCount={pageCount}
				onPageChange={setCurrentPage}
			/>
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	flex: 1;

	.post-list {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
		justify-content: center;
		width: 100%;
		max-width: 1000px;
		padding: 20px 0;
	}

	.no-posts {
		font-size: 18px;
		text-align: center;
		margin-top: 40px;
	}
`;
