# Invite Studio — Next.js + Node.js + PostgreSQL

This starter includes database-backed invitations, phone OTP authentication through Twilio Verify, unique public invitation pages, activity analytics, and a protected Super Admin dashboard.

## Requirements

- Node.js 20.9 or newer
- Docker Desktop (for the included local PostgreSQL database), or an existing PostgreSQL database
- A Twilio account with a **Twilio Verify Service** for real SMS OTP
- VS Code or another editor

## 1. Install and start PostgreSQL

From this project directory:

```powershell
docker compose up -d db
```

The local database defaults are in `docker-compose.yml`. They are for local development only; change credentials for any shared or deployed environment.

## 2. Configure environment variables

Copy the example file to `.env` (Prisma CLI reads `.env`, and Next.js also loads it):

```powershell
Copy-Item .env.example .env
```

Open `.env` and set:

- `DATABASE_URL`: PostgreSQL connection string. The default matches the local Docker database.
- `SESSION_SECRET`: a random secret with at least 32 characters. Generate one with:
  ```powershell
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```
- `NEXT_PUBLIC_APP_URL`: `http://localhost:3000` locally; use your real HTTPS URL after deployment.
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID`: credentials from Twilio Console. Create a Verify Service and use its `VA...` Service SID.

Do not commit `.env` or expose Twilio credentials in frontend code. SMS costs and Twilio trial restrictions may apply. On trial accounts, you may need to verify destination phone numbers in Twilio first.

## 3. Install dependencies and update the database

```powershell
npm install
npx prisma generate
npx prisma db push
```

`db push` creates or updates the Prisma schema. If you already have real user data in an older database, take a backup first and review the schema changes before applying them. Legacy users may have no phone number; the new OTP flow requires a registered phone number.

## 4. Run the app

```powershell
npm run dev
```

Open `http://localhost:3000`.

- `/login`: register or sign in with SMS OTP
- `/dashboard`: create and manage invitations
- `/invite/<slug>`: public page for a published invitation
- `/admin`: Super Admin analytics and user management (role required)

## 5. Create the first Super Admin

1. Start the app and register your own account at `/login` using your name, email, and phone in international format, e.g. `+919876543210`.
2. Complete the real SMS OTP verification.
3. In another terminal, run this from the project directory, replacing the email with the account you just registered:

```powershell
npm run admin:promote -- admin@example.com
```

4. Sign out and sign in again, then open `/admin`.

This command promotes an existing user directly in the database. Do not expose an API or public form that lets users choose their own role. To revoke Super Admin access, use Prisma Studio or a controlled database operation to set `role` back to `USER`.

## OTP behaviour

- Registration requires name, email, and mobile number; the account is created only after Twilio approves the SMS code.
- Login starts with the registered mobile number and completes after a valid SMS code.
- Phone numbers must be in E.164 format (for India, e.g. `+91...`).
- Twilio Verify handles OTP generation, expiry, and code checking. The app does not store raw OTP codes.
- Session cookies are HTTP-only, SameSite=Lax, and Secure in production.
- Twilio credentials are required for OTP; the app intentionally does not silently bypass verification in development.

## Super Admin dashboard and analytics

The dashboard shows total accounts, phone-verified accounts, users with recent activity (7 days), invitation counts, published invitations, suspended users, feature event counts, recent events, and the latest 100 accounts. A Super Admin can suspend or reactivate ordinary accounts. Suspended users cannot use authenticated APIs. Super Admin accounts cannot be suspended from this screen.

Activity events currently include OTP requests, verified sign-ups/logins, invitation create/update/publish/unpublish/delete, public invitation page views, and admin status changes. Public views are anonymous event counts; we intentionally do not collect visitor IP addresses, passwords, OTPs, session tokens, or invitation message text. Feature counts are event counts, not unique people. Public page views may be counted more than once because browser/metadata requests can revisit a page.

## Useful commands

```powershell
npm run db:generate
npm run db:push
npm run db:studio
npm run lint
npm run build
```

## API endpoints

### Authentication
- `POST /api/auth/otp/start` — `{ "intent":"signup", "name":"A Name", "email":"a@example.com", "phone":"+919876543210" }` or `{ "intent":"login", "phone":"+919876543210" }`
- `POST /api/auth/otp/verify` — `{ "intent":"signup", "name":"A Name", "email":"a@example.com", "phone":"+919876543210", "code":"123456" }` or `{ "intent":"login", "phone":"+919876543210", "code":"123456" }`
- `POST /api/auth/logout`
- `GET /api/auth/me`

The former password login/signup endpoints return `410 Gone`; OTP is now the only supported authentication path.

### Invitations (session required)
- `GET /api/invitations`
- `POST /api/invitations`
- `GET /api/invitations/:id`
- `PATCH /api/invitations/:id`
- `DELETE /api/invitations/:id`

### Super Admin (active Super Admin session required)
- `GET /api/admin/overview`
- `PATCH /api/admin/users/:id` — body `{ "status":"SUSPENDED" }` or `{ "status":"ACTIVE" }`

## Before production

Add server-side rate limiting for OTP start/verify and other sensitive APIs, passwordless recovery/account-change workflows, a clear privacy notice and retention policy, automated tests, error monitoring, backups, and deployment secrets. Configure Twilio spend limits and allowed countries. Use HTTPS and a managed PostgreSQL database with restricted credentials. Consider a stronger session revocation/version strategy for immediate logout across devices. Keep admin role changes restricted to trusted operators.
