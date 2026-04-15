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

### Vercel + Supabase (recommended)

1. Create a Supabase project.
2. Run SQL in Supabase SQL editor:
   - `create table if not exists public.site_content (id int primary key, content_json jsonb not null, updated_at timestamptz not null default now());`
   - `insert into public.site_content (id, content_json) values (1, '{}'::jsonb) on conflict (id) do nothing;`
3. In Vercel project settings, add env vars:
   - `NODE_ENV=production`
   - `FRONTEND_ORIGIN=https://<your-vercel-domain>`
   - `SESSION_SECRET=<long-random-secret>`
   - `ADMIN_LOGIN=<admin-login>`
   - `ADMIN_PASSWORD_HASH=<bcrypt-hash>`
   - `SUPABASE_URL=<from-supabase-project-settings>`
   - `SUPABASE_SERVICE_ROLE_KEY=<service-role-key>`
   - optional: `SUPABASE_CONTENT_TABLE=site_content`
4. Deploy to Vercel from this repo.

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
- Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
- Run behind HTTPS (secure cookie is enabled in production)


