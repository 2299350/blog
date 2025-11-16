const API_KEY = '0111d48dd85f011dfc1e49afa20326ff';

const DEFAULT_CITY = {
	lat: 55.7558,
	lon: 37.6173,
	city: 'Moscow',
};

export async function getWeather() {
	const lang = navigator.language?.slice(0, 2) || 'ru';

	let lat, lon, city;

	try {
		const ipInfo = await fetch('https://ipapi.co/json/').then((r) => r.json());

		if (ipInfo && ipInfo.latitude && ipInfo.longitude) {
			lat = ipInfo.latitude;
			lon = ipInfo.longitude;
			city = ipInfo.city || 'Unknown';
		} else {
			throw new Error('Invalid IP info');
		}
	} catch (err) {
		lat = DEFAULT_CITY.lat;
		lon = DEFAULT_CITY.lon;
		city = DEFAULT_CITY.city;
	}

	const url =
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}` +
		`&lon=${lon}` +
		`&units=metric` +
		`&lang=${lang}` +
		`&appid=${API_KEY}`;

	try {
		const data = await fetch(url).then((r) => r.json());

		const temp = Math.round(data.main.temp);
		const description = data.weather?.[0]?.description || '';
		const finalCity = data.name || city;

		return {
			city: finalCity,
			temp,
			description,
		};
	} catch (err) {
		return {
			city,
			temp: null,
			description: '',
		};
	}
}
