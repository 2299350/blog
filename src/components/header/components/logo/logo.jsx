import PropTypes from 'prop-types';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 48px;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const LogoContainer = ({ className }) => (
	<Link to="/" className={className}>
		<Icon id="fa-code" size="70px" margin="0 10px 0 0" />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>Веб-разработчика</SmallText>
		</div>
	</Link>
);

LogoContainer.propTypes = {
	className: PropTypes.string,
};

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
`;
