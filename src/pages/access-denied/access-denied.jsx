import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { H2, Button } from '../../components';

const AccessDeniedContainer = ({ className }) => {
	const location = useLocation();
	const from = location.state?.from;

	return (
		<div className={className}>
			<H2>Доступ запрещён</H2>
			<p className="text">У вас нет доступа к этой странице.</p>
			{from && <p className="path">Запрошенный адрес: {from}</p>}

			<Link to="/">
				<Button width="220px">На главную</Button>
			</Link>
		</div>
	);
};

AccessDeniedContainer.propTypes = {
	className: PropTypes.string,
};

export const AccessDenied = styled(AccessDeniedContainer)`
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
		margin: 10px 0 0;
		font-size: 18px;
	}

	.path {
		margin: 10px 0 30px;
		font-size: 16px;
		opacity: 0.7;
	}
`;
