# IDEAL SCHOOL

## Vercel deploy

Vercel root directory shu repo papkasi bo'lishi kerak. Sayt `index.html` orqali ochiladi.

Vercel Project Settings -> Environment Variables bo'limiga qo'shing:

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `FIREBASE_PLATFORM_DOC`

`FIREBASE_PRIVATE_KEY` qiymatini Service Account JSON ichidan oling. Vercelga kiritganda `\n` belgilarini saqlang.

## Local run

```bash
npm install
copy .env.example .env
npm start
```

Keyin oching:

```text
http://localhost:3000
```
