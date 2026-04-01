import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer, ErrorBlock, Modal, ProtectedRoute } from './components';
import { Authorization, Registration, Users, Post, Main, AccessDenied } from './pages';
import { setUser } from './actions';
import { PERMISSION } from './constants';
import { getUserSession } from './utils';
import styled from 'styled-components';

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
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		const currentUserData = getUserSession();

		if (currentUserData) {
			dispatch(
				setUser({
					...currentUserData,
					role_id: Number(currentUserData.role_id),
				}),
			);
		}

		// Ждём инициализацию пользователя до рендера маршрутов
		setIsLoading(false);
	}, [dispatch]);

	// Пока не восстановили сессию, маршруты не рисуем
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
					<Route path="/access-denied" element={<AccessDenied />} />

					<Route
						path="/users"
						element={
							<ProtectedRoute permission={PERMISSION.FETCH_USERS}>
								<Users />
							</ProtectedRoute>
						}
					/>

					<Route
						path="/post"
						element={
							<ProtectedRoute permission={PERMISSION.CREATE_POST}>
								<Post />
							</ProtectedRoute>
						}
					/>

					<Route path="/post/:id" element={<Post />} />

					<Route
						path="/post/:id/edit"
						element={
							<ProtectedRoute permission={PERMISSION.EDIT_POST}>
								<Post />
							</ProtectedRoute>
						}
					/>

					<Route
						path="*"
						element={
							<ErrorBlock error="404. Страницы с таким адресом не существует" />
						}
					/>
				</Routes>
			</Page>

			<Footer />
			<Modal />
		</AppColumn>
	);
}

export default Blog;
