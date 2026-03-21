# Changelog

All notable changes to the Oxiverse project will be documented in this file.

## [Unreleased]
### Added
- Created `directUrl` in `prisma/schema.prisma` mapping to the `DIRECT_URL` environment variable for handling migrations separately from the pooled connection environment.

### Changed
- Updated `.env` and `DEPLOYMENT.md` documentation to use connection pooling for Prisma Client in serverless environments on Vercel (`DATABASE_URL` port `6543` and `?pgbouncer=true`).
- Corrected Vercel database connectivity configuration for Supabase PostgreSQL.

### Fixed
- Fixed issue where the homepage retained deleted database records due to aggressive Next.js static rendering cache by adding `export const dynamic = 'force-dynamic'` to `src/app/page.tsx`.
- Fixed Vercel deployment error `PrismaClientInitializationError: Can't reach database server at db.dpgomyqzonhimempmnmh.supabase.co:5432` by routing the database connection string over the Supabase built-in PgBouncer pooler (port 6543).

## [1.0.0] - Initial Release
- Configured landing page and admin panel dashboards.
- Enabled Supabase database models for Blog and Research papers.
- Setup Markdown editing capabilities.
- Added NextAuth and secure authentication.
