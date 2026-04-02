import PropTypes from 'prop-types';
import styled from 'styled-components';

const H2Container = ({ className, children }) => {
	return <h2 className={className}>{children}</h2>;
};

H2Container.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
};

export const H2 = styled(H2Container)`
	font-size: 24px;
	margin: 40px 0 10px 0;
`;
