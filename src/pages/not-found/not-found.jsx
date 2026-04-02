import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H2, Button } from '../../components';

const NotFoundContainer = ({ className }) => {
	return (
		<div className={className}>
			<H2>Страница не найдена</H2>
			<p className="text">Страницы с таким адресом не существует.</p>

			<Link to="/">
				<Button width="220px">На главную</Button>
			</Link>
		</div>
	);
};

NotFoundContainer.propTypes = {
	className: PropTypes.string,
};

export const NotFound = styled(NotFoundContainer)`
	width: 1000px;
	min-height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 40px 80px;
	background-color: #fff;
	margin: 0 auto;

	.text {
		margin: 10px 0 30px;
		font-size: 18px;
	}
`;
