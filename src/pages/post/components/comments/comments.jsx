import styled from 'styled-components';

const CommentsContainer = ({ className }) => {
	return <div className={className}>Comments Section</div>;
};

export const Comments = styled(CommentsContainer)`
	width: 100%;
	margin-top: 20px;
`;
