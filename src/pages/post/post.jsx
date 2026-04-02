import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';
import { useParams, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest, useCheckAccess } from '../../hooks';
import { selectPost } from '../../selectors';
import { PostContent, PostForm } from './components';
import { Comments } from './components';
import { ErrorBlock } from '../../components';
import {
	loadPostAsync,
	loadCommentsAsync,
	savePostAsync,
	removePostAsync,
	openModal,
	closeModal,
	resetPostData,
} from '../../actions';
import { PERMISSION } from '../../constants';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [postError, setPostError] = useState(null);
	const dispatch = useDispatch();
	const { id } = useParams();
	const isCreating = useMatch('/post');
	const isEditing = useMatch('/post/:id/edit');
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	const specificPermission = isCreating ? PERMISSION.CREATE_POST : PERMISSION.EDIT_POST;
	const hasAccess = useCheckAccess(specificPermission);

	useLayoutEffect(() => {
		dispatch(resetPostData()); // Сбрасываем данные при заходе (чтобы не мелькал старый пост)
		setPostError(null);

		// Если мы создаем пост — загружать ничего не надо
		if (isCreating) {
			setIsLoading(false);
			return;
		}

		// Если есть ID — грузим пост
		setIsLoading(true);
		dispatch(loadPostAsync(requestServer, id)).then((result) => {
			if (result?.error) {
				setPostError(result.error);
				setIsLoading(false);
				return;
			}

			dispatch(loadCommentsAsync(requestServer, id));
			setIsLoading(false);
		});
	}, [requestServer, id, isCreating, dispatch]);

	const handlePostSave = async (postData) => {
		// Вызываем асинхронный экшен и ждем результат
		const savedPost = await dispatch(savePostAsync(requestServer, postData));

		// Если пост успешно сохранился (вернулся объект с данными), уходим из режима редактирования
		if (savedPost && savedPost.id) {
			navigate(`/post/${savedPost.id}`);
		}
	};

	const handlePostDelete = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: async () => {
					await dispatch(removePostAsync(requestServer, id));
					dispatch(resetPostData());
					navigate('/');
					dispatch(closeModal());
				},
				onCancel: () => dispatch(closeModal()),
			}),
		);
	};

	if (isLoading) {
		return <div className={className}>Загрузка...</div>;
	}

	// Если пост не найден — ошибка 404
	if (postError?.code === 'POST_NOT_FOUND') {
		return <ErrorBlock error="Такая статья не найдена" />;
	}

	// Если произошла другая ошибка загрузки
	if (postError?.code === 'REQUEST_ERROR') {
		return <ErrorBlock error="Ошибка загрузки статьи" />;
	}

	// Если мы пытаемся создать или редактировать без прав — ошибка доступа
	if ((isCreating || isEditing) && !hasAccess) {
		return (
			<ErrorBlock error="У вас нет прав для создания или редактирования статей" />
		);
	}

	return (
		<div className={className}>
			{/* Показываем форму, если мы редактируем ИЛИ создаем */}
			{isCreating || isEditing ? (
				<PostForm
					{...post}
					onPostDelete={handlePostDelete}
					onSave={handlePostSave}
				/>
			) : (
				<>
					<PostContent {...post} onPostDelete={handlePostDelete} />
					<Comments comments={post.comments ?? []} postId={post.id} />
				</>
			)}
		</div>
	);
};

PostContainer.propTypes = {
	className: PropTypes.string,
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
	width: 1000px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
