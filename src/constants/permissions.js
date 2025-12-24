import { ROLE } from './role';

export const PERMISSION = {
	/**
	 * ПРАВА НА РАБОТУ С ПОСТАМИ
	 */
	CREATE_POST: {
		access: [ROLE.ADMIN],
	},
	EDIT_POST: {
		access: [ROLE.ADMIN],
	},
	DELETE_POST: {
		access: [ROLE.ADMIN],
	},

	/**
	 * ПРАВА НА РАБОТУ С КОММЕНТАРИЯМИ
	 */
	CREATE_COMMENT: {
		access: [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER],
	},
	DELETE_COMMENT: {
		access: [ROLE.ADMIN, ROLE.MODERATOR],
		ownerAllowed: true, // Владелец может удалить свой комментарий
	},

	/**
	 * ПРАВА НА РАБОТУ С ПОЛЬЗОВАТЕЛЯМИ
	 */
	UPDATE_USER_ROLE: {
		access: [ROLE.ADMIN],
		excludeSelf: true, // Нельзя менять роль самому себе
	},
	DELETE_USER: {
		access: [ROLE.ADMIN],
		excludeSelf: true, // Нельзя удалить самого себя
	},
};
