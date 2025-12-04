import { useState, useLayoutEffect } from 'react'; // <--- Заменили useEffect
import { useDispatch } from 'react-redux';
import { setUser } from '../actions';
import { loadUserFromStorage } from '../utils/user-storage';

export const useInitAuth = () => {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);

	useLayoutEffect(() => {
		const savedUser = loadUserFromStorage();

		if (savedUser) {
			dispatch(setUser(savedUser));
		}

		setIsLoading(false);
	}, [dispatch]);

	return { isLoading };
};
