# Services

У цій папці зберігаються всі запити до бекенду.

## Структура

### `api.ts`

Базове налаштування Axios. Не змінювати без потреби.

---

### `auth.ts`

Запити для авторизації.

**Ендпоінти:**

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/refresh`

---

### `stories.ts`

Запити для історій.

**Ендпоінти:**

- `GET /stories`
- `GET /stories/popular`
- `GET /story/:storyId`
- `POST /stories`

---

### `categories.ts`

Запити для категорій.

**Ендпоінти:**

- `GET /categories`

---

### `users.ts`

Запити для користувачів.

**Ендпоінти:**

- `GET /users`
- `GET /users/me`
- `GET /users/popular`
- `GET /users/:userId`
- `POST /users/save`
- `DELETE /users/save/:storyId`

---

## Як додавати запити

У потрібному файлі імпортуємо API:

```ts
import api from './api';
```

### Приклад

```ts
export const getCategories = async () => {
  const { data } = await api.get('/categories');
  return data;
};
```

## Правила

- Не використовувати `axios` напряму в компонентах.
- Не писати URL бекенду (Render або localhost) вручну.
- Усі запити виконувати тільки через `api.ts`.
- Кожен учасник додає свої функції лише у відповідний файл.
- Якщо на бекенді з'являються нові ендпоінти, оновіть цей README та відповідний
  файл у `services`.
