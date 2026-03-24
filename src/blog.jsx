import { useLayoutEffect, useState } from 'react'; // Добавляем useState
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components';
import { Authorization, Registration, Users, Post, Main } from './pages';
import { setUser } from './actions';
import { getUserSession } from './utils';
import styled from 'styled-components';
import { Modal } from './components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #fff;
`;

const Page = styled.div`
	display: flex;
	flex: 1;
	padding: 120px 0 20px 0;
`;

function Blog() {
	const dispatch = useDispatch();
	// 1. Блокируем отображение с самого начала
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		const currentUserData = getUserSession();

		// Если данные есть, диспатчим их
		if (currentUserData) {
			dispatch(
				setUser({
					...currentUserData,
					role_id: Number(currentUserData.role_id),
				}),
			);
		}

		// 2. Только когда закончили с Redux — убираем лоадер
		setIsLoading(false);
	}, [dispatch]);

	// 3. Если идет загрузка — не рисуем Routes вообще.
	// Компонент Users даже не смонтируется и не отправит кривой запрос.
	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	return (
		<AppColumn>
			<Header />

			<Page>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route path="*" element={<div>Error</div>} />
				</Routes>
			</Page>

			<Footer />
			<Modal />
		</AppColumn>
	);
}

export default Blog;
