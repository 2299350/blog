export const sanitizeContent = (content) => {
	return content
		.replaceAll('&nbsp;', ' ') // Заменяем неразрывные пробелы на обычные
		.replace(/ +/g, ' ') // Заменяем повторяющиеся пробелы на один
		.replaceAll('<', '&lt;') // Экранируем открывающую скобку (защита)
		.replaceAll('>', '&gt;'); // Экранируем закрывающую скобку (защита)
};
