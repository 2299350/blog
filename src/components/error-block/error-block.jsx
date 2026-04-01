import styled from 'styled-components';

const ErrorBlockContainer = ({ className, error }) => {
	return <div className={className}>{error}</div>;
};

export const ErrorBlock = styled(ErrorBlockContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 600px;
	margin: 0 auto;
	margin-top: 30px;
	font-size: 18px;
	color: #d9534f;
	font-weight: 500;
`;
