import { useEffect, useState } from 'react';
import { useParams, useMatch, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest, useCheckAccess } from '../../hooks';
import { selectPost } from '../../selectors';
import { PostContent, PostForm } from './components';
import { Comments } from './components';
import { loadPostAsync, loadCommentsAsync, savePostAsync } from '../../actions';
import { PERMISSION } from '../../constants';
import styled from 'styled-components';

const PostContainer = ({ className }) => {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
	const { id } = useParams();
	const isEditing = useMatch('/post/:id/edit');
	const navigate = useNavigate();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	const canEdit = useCheckAccess(PERMISSION.EDIT_POST);

	useEffect(() => {
		setIsLoading(true);

		dispatch(loadPostAsync(requestServer, id)).then(() => {
			setIsLoading(false);
		});

		dispatch(loadCommentsAsync(requestServer, id));
	}, [requestServer, id, dispatch]);

	const handlePostSave = async (postData) => {
		// Вызываем асинхронный экшен и ждем результат
		const savedPost = await dispatch(savePostAsync(requestServer, postData));

		// Если пост успешно сохранился (вернулся объект с данными), уходим из режима редактирования
		if (savedPost && savedPost.id) {
			navigate(`/post/${savedPost.id}`);
		}
	};

	if (isLoading) {
		return <div className={className}>Загрузка...</div>;
	}

	// Если ID нет — значит пост не найден
	if (!post.id) {
		return (
			<div className={className}>
				<div className="error">Такая страница не найдена</div>
			</div>
		);
	}
	//Если пытаемся редактировать без прав — показываем ошибку
	if (isEditing && !canEdit) {
		return (
			<div className={className}>
				<div className="error">У вас нет прав на редактирование этой статьи</div>
			</div>
		);
	}

	return (
		<div className={className}>
			{isEditing ? (
				<PostForm {...post} onSave={handlePostSave} />
			) : (
				<>
					<PostContent {...post} />
					<Comments comments={post.comments ?? []} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
	width: 1000px;
	display: flex;
	flex-direction: column;
	align-items: center;

	.error {
		margin-top: 16px;
		text-align: center;
		color: #d9534f;
		font-weight: 500;
	}
`;
