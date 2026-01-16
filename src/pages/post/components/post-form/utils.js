export const sanitizeContent = (content) => {
	return content
		.replace(/ +/g, ' ') // Убираем лишние пробелы
		.replace(/&nbsp;/g, ' ') // Убираем неразрывные пробелы
		.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '') // Вырезаем скрипты (безопасность)
		.replace(/ style="[^"]*"/g, ''); //  Вырезаем мусорные стили (style="...") при копипасте
};
