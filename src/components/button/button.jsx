import styled from 'styled-components';

const ButtonContainer = ({ className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{props.children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 40px;
	padding: 10px;
	background-color: #f0f0f0;
	border: 1px solid #000;
	border-radius: 4px;

	&:hover {
		cursor: pointer;
		background-color: #e0e0e0;
	}
`;
