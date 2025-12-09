import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useServerRequest } from '../../hooks';
import { selectPost } from '../../selectors';
import { PostContent } from './components';
import { Comments } from './components';
import styled from 'styled-components';
import { loadPostAsync } from '../../actions';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const requestServer = useServerRequest();
	const post = useSelector(selectPost);

	useEffect(() => {
		dispatch(loadPostAsync(requestServer, id));
	}, [requestServer, id, dispatch]);
	return (
		<div className={className}>
			<PostContent {...post} />
			<Comments comments={post.comments ?? []} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	padding: 40px 80px;
	width: 1000px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;
