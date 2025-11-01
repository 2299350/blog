Области хранения данных:

- база данных JSON-сервер
- BFF
- Redux store

Сущности приложения:

- пользователь: БД (список пользователей), BFF (сессия текущего), Redux store (отображение в браузере)
- роль пользователя: БД (список ролей), BFF (сессия пользователя с ролью), Redux store (использование на клиенте)
- статья: БД (список статей), Redux store (отображение в браузере)
- комментарий: БД (список комментариев), Redux store (отображение в браузере)

Таблицы БД:

- пользователи - users: id / login / password / registered_at / role_id
- роли - roles: id / name
- статьи - posts: id / title / image_url (https://picsum.photos/280/150) / content / published_at
- комментарии - comments id / author_id / post_id / content

Схема состояния на BFF:

- сессия текущего пользователя: login / password / role

Схема для Redux store (на клиенте):

- user: id / login / role_id
- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
- post: id / title / imageUrl / content / publishedAt / comments: массив comment: id / author / content / publishedAt
- users: массив user: id / login / registeredAt / role
