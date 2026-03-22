# SROCORE Web - Complete Setup and Deployment Guide

This project is a web application built with Next.js for a Silkroad server.
If you've never developed anything before, don't worry: here are the steps from scratch.

## 1) What is this project

This web application includes:

- Server home page with information.
- Player and guild rankings.
- Login, registration, and account dashboard.
- SQL Server database integration.
- Optional email sending with Mailgun.

## 2) Technologies used

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- SQL Server (via `mssql` package)
- JWT (cookie-based sessions)
- Mailgun (optional, for email)

## 3) Requirements before you start

Install these tools first:

1. Node.js 22 LTS or higher
2. pnpm (recommended) or npm
3. SQL Server (or access to an already running one)
4. Git

### Check that everything is installed

Open a terminal and run:

```bash
node -v
pnpm -v
git --version
```

If you don't have `pnpm`, install it with:

```bash
npm install -g pnpm
```

## 4) Download the project from GitHub

```bash
git clone https://github.com/robertiv/CoreWeb-SRO.git
cd YOUR-REPO
```

## 5) Configure environment variables (.env.local)

In the project root, create a file named `.env.local`.

Recommended content:

```env
DB_USER=your_sql_username
DB_PASSWORD=your_sql_password
DB_SERVER=your_sql_server_host
DB_NAME=main_database_name

JWT_SECRET=put_a_long_and_secure_value_here

# Optional (only if you want to send emails)
MAILGUN_API_KEY=
MAILGUN_DOMAIN=
```

### Meaning of each variable

- `DB_USER`: SQL Server username
- `DB_PASSWORD`: SQL Server password
- `DB_SERVER`: SQL Server host
- `DB_NAME`: main database name for connection
- `JWT_SECRET`: secret key for signing sessions
- `MAILGUN_API_KEY`: Mailgun API key (optional)
- `MAILGUN_DOMAIN`: domain configured in Mailgun (optional)

### How to generate a secure JWT_SECRET

You can generate one like this:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the result and paste it into `JWT_SECRET`.

## 6) Prepare the SQL Server database

To set up the database, you must execute the SQL script provided with this project.

### Run the setup script

1. Open SQL Server Management Studio (SSMS) or SQL Server Query Tool.
2. Open the script file: `SRO_VT_COREWEB.sql` (located in the project root).
3. Execute the script against your SQL Server database.

This script creates or updates all necessary tables, stored procedures, and functions required by the web application.

If you skip the script or these objects on it don't exist, the web won't be able to display rankings or handle login/registration.

## 7) Install dependencies

With pnpm (recommended):

```bash
pnpm install
```

If you prefer npm:

```bash
npm install
```

## 8) Run in development mode

With pnpm:

```bash
pnpm dev
```

With npm:

```bash
npm run dev
```

Open in your browser:

- http://localhost:3000

## 9) Test production build on your PC

Before uploading online, try this:

```bash
pnpm build
pnpm start
```

Then open http://localhost:3000 and check:

1. Home
2. Login/registration
3. Dashboard
4. Ranking

## 10) Deploy to production (publish for everyone) on your own Server

Recommended when your SQL Server is on a private network or you want full control.

General steps:

1. Create a server (Windows Server).
2. Install Node.js + pnpm + Git.
3. Clone the repo.
4. Create `.env.production` (same variables as `.env.local`).
5. Run:

```bash
pnpm install
pnpm build
pnpm start
```

6. Keep the app running with PM2.
7. Set up Nginx (or IIS) as a proxy to use a domain and HTTPS.

Basic PM2 commands:

```bash
npm install -g pm2
pm2 start "pnpm start" --name srocore-web
pm2 save
pm2 startup
```

## 11) Visual configuration of the web

You can change the server name, social links, and public data by editing:

- `lib/public-config.ts`

## 12) Recommended minimum security

1. Use a long and unique `JWT_SECRET`.
2. Limit SQL access by IP/firewall.
3. Enable HTTPS in production.
4. Rotate keys (JWT/API keys) periodically.

## 13) Common issues

### SQL connection error

- Check `DB_SERVER`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- Verify firewall and SQL Server port.

### Login doesn't work

- Confirm that `SRO_VT_ACCOUNT.dbo.TB_User` exists.
- Check that `JWT_SECRET` is defined.

### Empty ranking

- Check tables in `SRO_VT_SHARD` and `SRO_VT_COREWEB`.
- Confirm that ranking tables have data.

### Email not sending

- Configure `MAILGUN_API_KEY` and `MAILGUN_DOMAIN`.
- If you won't use email, you can leave these variables empty.

