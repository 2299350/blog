import { H2 } from '../../components/h2/h2';
import { ErrorBlock } from '../error-block/error-block';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentContainer = ({ className, children, isLoading = false, error }) => {
	if (isLoading) {
		return (
			<div className={className}>
				<H2>Пользователи</H2>
				<p className="info">Загрузка...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className={className}>
				<H2>Пользователи</H2>
				<ErrorBlock error="Ошибка загрузки пользователей" />
			</div>
		);
	}

	return <div className={className}>{children}</div>;
};

ContentContainer.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	isLoading: PropTypes.bool,
	error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.node]),
};

export const Content = styled(ContentContainer)`
	width: 100%;

	.info {
		margin-top: 16px;
		text-align: center;
		opacity: 0.8;
	}

	.error {
		margin-top: 16px;
		text-align: center;
		color: #d9534f;
		font-weight: 500;
	}
`;
