import PropTypes from 'prop-types';
import styled from 'styled-components';

const IconContainer = ({ className, id, ...rest }) => (
	<div className={className} {...rest}>
		<i className={`fa ${id}`} aria-hidden="true"></i>
	</div>
);

IconContainer.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string.isRequired,
	size: PropTypes.string,
	margin: PropTypes.string,
	onClick: PropTypes.func,
};

export const Icon = styled(IconContainer)`
	font-size: ${({ size }) => size};
	margin: ${({ margin }) => margin};
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;
