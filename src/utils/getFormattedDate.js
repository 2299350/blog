export const getFormattedDate = () => {
	const lang = navigator.language || 'ru-RU';

	const now = new Date();

	return new Intl.DateTimeFormat(lang, {
		day: 'numeric',
		month: 'long',
	}).format(now);
};
