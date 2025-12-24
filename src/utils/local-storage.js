export const setUserSession = (sessionData) => {
	localStorage.setItem('userData', JSON.stringify(sessionData));
};

export const getUserSession = () => {
	const userDataJson = localStorage.getItem('userData');
	if (!userDataJson) {
		return null;
	}
	return JSON.parse(userDataJson);
};

export const removeUserSession = () => {
	localStorage.removeItem('userData');
};
