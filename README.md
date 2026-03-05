# Egor Site Prototype (Next.js 14)

Техпрототип личного сайта Егора на **Next.js 14 + Tailwind + App Router**.

## Что внутри
- Страницы:
  - `/`
  - `/about`
  - `/projects`
  - `/ai-profile`
- API:
  - `/api/profile`
  - `/api/projects`
  - `/api/posts`
- Базовые JSON-LD заготовки:
  - Person (главная)
  - Organization (проекты)
  - Article (в выдаче `/api/posts`)
- Легкие анимации (Tailwind keyframes + hover)

## Запуск (локально)
```bash
cd /root/.openclaw/workspace/egor-site-prototype
npm install
npm run dev
```
Открыть: `http://localhost:3000`

> Важно: это Next.js-приложение. Не запускай через `python -m http.server` и не открывай папку `dist` — так будут 404 на assets.

## Сборка
```bash
npm run build
npm run start
```

## Структура
- `app/*` — страницы и API route handlers
- `components/*` — общие компоненты
- `data/*` — контентные заглушки профиля/проектов/постов

## Дальше (v1.1)
- Подключить реальные тексты и контакты
- Добавить OG-изображения и favicon
- Добавить локализацию и CMS/MDX
- Доработать анимации (Framer Motion)
