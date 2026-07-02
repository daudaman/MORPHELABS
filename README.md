# Morphe CMS

Full-stack CMS: Node/Express + Prisma + PostgreSQL backend, React (MUI) admin panel, Next.js public frontend.
Three content modules: **Blog**, **Services**, **Careers** — full CRUD, JWT auth, role-based access (ADMIN/EDITOR).

## Structure
```
backend/    Express API + Prisma schema (PostgreSQL)
admin/      React admin panel (Vite + MUI)
frontend/   Next.js public site
```

## 1. Backend setup
```
cd backend
cp .env.example .env      # set DATABASE_URL and JWT_SECRET
npm install
npx prisma migrate dev --name init
npm run dev                # runs on http://localhost:5000
```
Create your first admin user by calling `POST /api/auth/register` with
`{ "name": "Admin", "email": "admin@morphe.com", "password": "yourpass", "role": "ADMIN" }`.

## 2. Admin panel setup
```
cd admin
cp .env.example .env
npm install
npm run dev                # runs on http://localhost:5173
```
Log in with the admin account created above. Manage Blog, Services and Careers content, toggle Published/Draft.

## 3. Public frontend setup
```
cd frontend
cp .env.example .env.local
npm install
npm run dev                # runs on http://localhost:3000
```
Only published content shows up on the public site.

## API overview
- `POST /api/auth/register`, `POST /api/auth/login`
- `GET/POST /api/posts`, `GET/PUT/DELETE /api/posts/:id` (and `/:slug` for GET single)
- Same pattern for `/api/services` and `/api/careers`
- Write operations (`POST`/`PUT`/`DELETE`) require `Authorization: Bearer <token>`

## Notes
- Backend uses Prisma migrations, so schema changes are version-controlled.
- Admin panel is one generic CRUD component reused for all three content types.
- Brand colors (dark navy + purple) applied to the public frontend to match the reference design.
