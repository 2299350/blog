import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();

	useEffect(() => {
		let currentLogoutSwitcher = store.getState().app.logoutSwitcher;

		return store.subscribe(() => {
			const prevLogoutSwitcher = currentLogoutSwitcher;
			currentLogoutSwitcher = store.getState().app.logoutSwitcher;

			if (currentLogoutSwitcher !== prevLogoutSwitcher) {
				reset();
			}
		});
	}, [store, reset]);
};
