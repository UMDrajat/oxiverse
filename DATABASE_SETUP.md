# Database Setup Guide - Supabase + Prisma

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Choose a region close to you
4. Set a strong database password (save it!)
5. Wait for the project to provision (~2 minutes)

## Step 2: Get Your Credentials

Once your project is ready:

1. Go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** → `SUPABASE_URL`
   - **anon/public key** → `SUPABASE_ANON_KEY`
   - **service_role key** → `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)

## Step 3: Get Database Connection String

1. Go to **Settings** → **Database**
2. Under **Connection string**, select **URI** mode
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your actual database password
5. This is your `DATABASE_URL`

## Step 4: Update .env File

Paste your credentials into the `.env` file:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
SUPABASE_URL="https://[PROJECT-REF].supabase.co"
SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
```

## Step 5: Generate NextAuth Secret

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use any online generator. Paste it into `.env`:

```env
NEXTAUTH_SECRET="[YOUR-GENERATED-SECRET]"
NEXTAUTH_URL="http://localhost:3000"
```

## Step 6: Push Prisma Schema to Database

Run this command to create the database tables:

```bash
npx prisma db push
```

This will:
- Create `User`, `Blog`, `ResearchPaper`, and `Category` tables
- Set up indexes for performance
- Create foreign key relationships

## Step 7: Verify Setup

Run Prisma Studio to see your database:

```bash
npx prisma studio
```

This opens a web interface at `http://localhost:5555` where you can browse your data.

---

## Next Steps

After completing setup:
1. Configure NextAuth.js for admin authentication
2. Create the admin dashboard
3. Build CRUD APIs for Blog and Research
