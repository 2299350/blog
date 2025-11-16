import { useState, useEffect } from 'react';
import { getWeather } from '../../api/weather';
import { getFormattedDate } from '../../utils';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temp, setTemp] = useState(null);
	const [description, setDescription] = useState('');

	useEffect(() => {
		getWeather().then((w) => {
			setCity(w.city);
			setTemp(w.temp);
			setDescription(w.description);
		});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог Веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				{city && temp !== null ? (
					<div>
						<div>
							{city}, {getFormattedDate()}
						</div>
						<div>
							{temp}°C — {description}
						</div>
					</div>
				) : (
					<div>Загружаем погоду…</div>
				)}
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-height: 120px;
	padding-left: 40px;
	padding-right: 40px;
	width: 1000px;
	background-color: #fff;
	box-shadow: 0 -2px 14px rgba(0, 0, 0, 0.2);
	font-weight: bold;
`;
