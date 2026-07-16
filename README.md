# 🌿 Природні Мандри — Frontend

Фронтенд-частина платформи «Природні Мандри» — навчальний груповий проєкт, присвячений популяризації еко-туризму в Україні. Побудований на Next.js з акцентом на продуктивність, доступність та mobile-first підхід.

## 🛠 Технологічний стек

### 🌐 Core
- **Next.js 15** (App Router) — основний фреймворк.
- **React** — бібліотека інтерфейсів.
- **TypeScript** — сувора типізація.

### 🎨 Стилізація та UI
- **CSS Modules** — ізольовані стилі для кожного компонента.
- **modern-normalize** — скидання стандартних стилів браузера.
- **Swiper.js** — слайдери (популярні статті, «Наші мандрівники»).
- **React Hot Toast** — toast-повідомлення про успіх/помилки.

### ⚙️ Керування даними
- **Axios** — HTTP-клієнт для взаємодії з API.
- **TanStack Query** — синхронізація серверного стану та кешування.
- **Zustand** (з `persist` middleware) — глобальний стан авторизації (`store/authStore.ts`).

### 📝 Форми
- **Formik** — керування станом форм.
- **Yup** — валідація даних на клієнті.
- **React Dropzone** — завантаження зображень (обкладинка статті, аватар).

### 🧹 Якість коду
- **ESLint**, **Prettier** — лінтинг і форматування.

### 🔐 Авторизація
- Сесійна автентифікація на основі **UUID-токенів у MongoDB** (без JWT).
- Cookies: `accessToken` (15 хв), `refreshToken` (rotating), `sessionId`.
- Захист приватних маршрутів (`/profile`, `/new-story`) через **`middleware.ts`** — перевірка токена, silent-refresh через серверний API-шар, редірект неавторизованих на `/auth/login`.
- Одна активна сесія на користувача (новий логін інвалідує стару).

### 🖼 Медіа
- Завантаження аватара користувача — через бекенд-ендпоінт з **Cloudinary** (ресайз до 500×500, дозволені формати jpg/png/gif/webp, ліміт 1MB).

## 📂 Структура проєкту

```
pryrodni-mandry-front/
├── app/
│   ├── (auth routes)/
│   │   └── auth/
│   │       ├── login/          # LoginPage.module.css, page.tsx
│   │       └── register/       # Register.module.css, page.tsx
│   ├── (private routes)/
│   │   └── profile/
│   │       ├── my-stories/     # MyStoriesPageClient.tsx, page.tsx
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── profile.module.css
│   │       └── ProfilePageClient.tsx
│   ├── api/
│   │   ├── _utils/
│   │   ├── auth/                # login, logout, me, register, session
│   │   ├── categories/
│   │   ├── stories/              # [storyId], popular
│   │   ├── users/                 # [travellerId], my-stories, save, save/[storyId], saved-stories
│   │   └── api.ts
│   ├── stories/
│   │   ├── [storyId]/
│   │   │   ├── edit/
│   │   │   └── not-found.tsx
│   │   ├── new/                    # AddStoryPage.module.css, page.tsx
│   │   └── StoriesPageClient.tsx
│   ├── travellers/
│   │   └── [travellerId]/          # TravellerDetailsPageClient.tsx
│   ├── error.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── page.tsx
│
├── components/
│   ├── ConfirmModal/
│   ├── ErrorWhileSavingModal/
│   ├── Footer/
│   │   ├── Copyright/
│   │   ├── FooterNav/
│   │   ├── PageTitle/
│   │   └── SocialList/
│   ├── LoginForm/
│   ├── MessageNoStories/
│   ├── ProfilePage/
│   │   ├── ProfileHeader/
│   │   └── ProfileTabs/
│   ├── RegisterPage/
│   │   ├── AuthFooter/
│   │   ├── AuthHeader/
│   │   ├── MainAuthNav/
│   │   └── RegistrationForm/
│   ├── StoryCard/
│   ├── StoryPage/
│   │   ├── CategoryFilter/
│   │   ├── RecomendedStories/
│   │   ├── SaveStory/
│   │   └── StoryDetails/
│   ├── home/
│   │   ├── About/
│   │   ├── Hero/
│   │   ├── Join/                    # Join.tsx, JoinLink.tsx
│   │   ├── OurTravellers/
│   │   └── PopularStories/
│   ├── layout/
│   │   ├── AppLayout/
│   │   ├── AuthBar/
│   │   ├── BurgerMenu/
│   │   ├── Header/
│   │   ├── MobileMenu/
│   │   └── UserBar/
│   ├── providers/                    # QueryProvider.tsx
│   ├── stories/
│   │   ├── CustomSelect/
│   │   ├── StoryForm/
│   │   └── StoryImagePicker/
│   ├── travellers/
│   │   ├── TravellerCard/
│   │   ├── TravellerInfo/
│   │   ├── TravellerStories/
│   │   ├── TravellersList/
│   │   ├── TravellersSection/
│   │   └── TravellersSlider/
│   └── ui/
│       ├── Avatar/
│       ├── Icon/
│       ├── LoadMoreButton/
│       └── Loader/
│
├── constants/                          # stories.ts, storyValidation.ts
├── hooks/
├── public/
│   ├── icons/                          # sprite.svg
│   └── images/
├── schemas/
├── services/                           # api.ts, auth.ts, categories.ts, stories.ts, users.ts, README.md
├── store/                              # authStore.ts, useSavedStoriesStore.ts
├── types/                              # category.ts, story.ts, traveller.ts, user.ts
├── utils/
│
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.mjs
├── global.d.ts
├── middleware.ts                        # захист приватних маршрутів
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## 🛠 Командний Workflow

### 1. Стилізація (CSS Modules)
- Кожен компонент має свій файл `Name.module.css`.
- Використовуйте змінні з `:root` для консистентності.

### 2. Взаємодія з API
- Усі запити мають проходити через сервісний шар у `services/`. **Заборонено** викликати Axios напряму всередині компонентів.
- `clientApi` — для Client Components, авторизація через httpOnly cookies автоматично.
- `serverApi` — для Server Components, куки передаються вручну з контексту Next.js (headers/cookies).

### 3. Правила Server/Client Components
- **Server Components** — за замовчуванням для сторінок і статичних частин.
- **Client Components** — лише там, де є `useState`, `useEffect`, форми або Swiper. Директива `'use client'` — на рівні найменшого можливого вузла.

### 4. Робота з гілками та комітами

- `main` — стабільна гілка (реліз).
- `develop` — основна робоча гілка, PR-и мержаться туди.
- Для задач створюємо гілки від `develop`, наприклад:
```
feature/header
feature/home-page
feature/stories-page
fix/header-navigation
```

Conventional Commits:
- `feat:` — нова функціональність
- `fix:` — виправлення помилки
- `docs:` — зміни в документації
- `refactor:` — зміни коду без зміни поведінки
- `style:` — форматування (Prettier), без впливу на логіку
- `perf:` — покращення продуктивності
- `test:` — тести
- `build:` — залежності, конфігурація збірки
- `ci:` — CI/CD
- `chore:` — інші дрібні зміни

### ✅ Чек-лист перед Pull Request
- [ ] Відсутність `any` — весь код строго типізований
- [ ] Назва PR і комітів відповідає Conventional Commits
- [ ] Виконано `npm run format`
- [ ] Видалені всі `console.log`, `debugger`, закоментований код
- [ ] `npm run lint` проходить без помилок і попереджень
- [ ] Нові env-змінні задокументовані в `.env.example`
- [ ] Якщо PR змінює UI — додано скріншот або GIF/Loom-запис

## 🚀 Як почати роботу

### 1. Підготовка та встановлення
```bash
git clone https://github.com/alina-hryhorenko/pryrodni-mandry-front.git
cd pryrodni-mandry-front
npm install
```

### 2. Налаштування середовища
Створіть `.env.local` на основі `.env.example`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
BACKEND_URL=http://localhost:4000
```
> ⚠️ Бекенд дозволяє CORS-запити лише з `localhost:5000` (або `3000`) та задеплойного `https://pryrodni-mandry-front-bay.vercel.app`. Запускайте фронтенд саме на дозволеному порту, інакше прямі клієнтські запити впадуть через CORS — використовуйте internal route handlers (`app/api/...`) як проксі до бекенду.

### 3. Запуск сервера розробки
```bash
npm run dev
```
Застосунок буде доступний на `http://localhost:3000` (або на порту, вказаному вище).

## 🛠 Додаткові команди

| Команда | Що робить |
|---|---|
| `npm run dev` | Запускає сервер розробки |
| `npm run build` | Продакшн-збірка |
| `npm run start` | Запускає продакшн-збірку локально |
| `npm run format` | Автоматично виправляє форматування (Prettier) |
| `npm run format:check` | Перевіряє форматування без виправлення |
| `npm run type-check` | Перевірка TypeScript без збірки |
| `npm run lint` | Перевірка ESLint |
| `npm run lint:fix` | Автоматичне виправлення простих помилок лінтера |

## 🌍 Демо
[pryrodni-mandry-front-bay.vercel.app](https://pryrodni-mandry-front-bay.vercel.app/)

## 🔗 Пов'язані репозиторії
- Backend: [pryrodni-mandry-back](https://github.com/alina-hryhorenko/pryrodni-mandry-back)
