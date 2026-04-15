## Hairsaloon

### Local run

1. Install dependencies:
   - `npm install`
2. Create env file:
   - copy `.env.example` to `.env`
3. Set admin credentials:
   - `ADMIN_LOGIN=admin`
   - `ADMIN_PASSWORD_HASH=<bcrypt hash>`
   - hash generator:
     - `node -e "import('bcryptjs').then(b=>b.hash('your_password',10).then(console.log))"`
4. Start frontend + backend:
   - `npm run dev:full`
5. Open:
   - site: `http://localhost:8080`
   - admin: `http://localhost:8080/admin`

### Backend endpoints

- Public:
  - `GET /api/content`
- Auth:
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/session`
- Admin:
  - `GET /api/admin/content`
  - `PUT /api/admin/content` (requires session + `x-csrf-token`)

### Tests

- Backend auth/content flow:
  - `npm run test:server`

### Production security checklist

- Set `NODE_ENV=production`
- Set strong random `SESSION_SECRET`
- Set `ADMIN_LOGIN` and `ADMIN_PASSWORD_HASH` (bcrypt hash only)
- Set `FRONTEND_ORIGIN` to your real domain (or comma-separated domains)
- Set `REDIS_URL` (required in production)
- Run behind HTTPS (secure cookie is enabled in production)


