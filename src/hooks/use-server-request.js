import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';
import { server } from '../bff';
import { OPERATIONS } from '../constants';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/logout';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);
	const dispatch = useDispatch();

	// список операций, которым НЕ нужна сессия
	const noSessionOps = new Set([
		OPERATIONS.REGISTER,
		OPERATIONS.AUTHORIZE,
		OPERATIONS.FETCH_POST,
		OPERATIONS.FETCH_COMMENTS,
	]);

	// основная функция — мемоизирована
	return useCallback(
		async (operation, ...params) => {
			// готовим вызов
			const call = noSessionOps.has(operation)
				? server[operation](...params)
				: server[operation](session, ...params);

			// ждём ответ сервера
			const resp = await call;

			// если доступ запрещён, выходим из системы
			if (resp?.error === 'Access is denied') {
				// логический выход
				// dispatch(logout());
				console.warn('Access is denied - logging out');
			}

			return resp;
		},
		[session, dispatch], // добавили dispatch в зависимости
	);
};
