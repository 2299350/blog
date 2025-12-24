export const checkAccess = (
	{ access, ownerAllowed = false, excludeSelf = false },
	userRole,
	resourceOwnerId = null,
	userId = null,
) => {
	// 1. Если правил нет, на всякий случай запрещаем
	if (!access) return false;

	// Определяем, является ли текущий пользователь владельцем ресурса
	// Проверка на null нужна, чтобы не сравнить null === null как true
	const isOwner =
		resourceOwnerId !== null &&
		userId !== null &&
		String(resourceOwnerId) === String(userId);

	// 2. ПРОВЕРКА ЗАПРЕТА (excludeSelf)
	// Если действие запрещено над собой (например, удаление), и мы — цель действия.
	if (excludeSelf && isOwner) {
		return false;
	}

	// 3. ПРОВЕРКА ПО РОЛИ (access)
	// Если роль есть в списке разрешенных — доступ открыт.
	if (access.includes(userRole)) {
		return true;
	}

	// 4. ПРОВЕРКА ВЛАДЕЛЬЦА (ownerAllowed)
	// Если роль не подошла, но разрешено владельцу и мы владелец — доступ открыт.
	if (ownerAllowed && isOwner) {
		return true;
	}

	// 5. Иначе доступ закрыт
	return false;
};
