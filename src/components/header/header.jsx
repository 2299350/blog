import styled from 'styled-components';
import { Logo, ControlPanel } from './components';

const DescriptionContainer = ({ className }) => (
	<div className={className}>
		<div>
			Веб-технологии <br />
			Написание кода <br />
			Разбор ошибок
		</div>
	</div>
);

const Description = styled(DescriptionContainer)`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<>
		<header className={className}>
			<Logo />
			<Description />
			<ControlPanel />
		</header>
	</>
);

export const Header = styled(HeaderContainer)`
	position: fixed;
	top: 0;
	width: 1000px;
	z-index: 10;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 120px;
	padding-left: 40px;
	padding-right: 40px;
	box-shadow: 0 2px 14px rgba(0, 0, 0, 0.2);
`;
