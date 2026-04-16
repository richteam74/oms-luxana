# RichApps

RichApps is a premium dark-theme internal ecommerce operations command center for Malaysia.

## Stack
- Next.js App Router + TypeScript + Tailwind
- Prisma/PostgreSQL runtime layer (legacy) and Supabase SQL artifacts for migration
- Zod validation and domain normalization helpers
- Recharts and modular dashboard UI

## Deliverables Included
1. Full Next.js folder structure (admin modules + docs + API v1 contracts)
2. Complete Supabase schema SQL: `supabase/schema.sql`
3. Seed SQL: `supabase/seed.sql`
4. RLS policies: `supabase/rls.sql`
5. Key domain types: `src/lib/domain/types.ts`
6. Sidebar config: `src/config/sidebar.ts`
7. Auth/protected layout foundation in `src/app/admin/layout.tsx` and middleware
8. Main module pages for Dashboard, Orders, Shipping, Inventory, Reports, Finance, Users, Integrations, Settings
9. Courier service contract via domain interface in `src/lib/domain/types.ts`
10. Internal docs pages under `/admin/docs/*`
11. API contracts under `/api/v1/*`
12. Normalization helpers inspired by Luxana workflows in `src/lib/domain/normalization.ts`

## API Contract Summary
- `POST /api/v1/orders`
- `GET /api/v1/orders`
- `GET /api/v1/orders/:id`
- `PUT /api/v1/orders/:id/status`
- `GET /api/v1/products`
- `GET /api/v1/couriers`
- `POST /api/v1/courier/push`
- `POST /api/v1/courier/generate-awb`
- `GET /api/v1/health`

## Local Setup
```bash
npm install
npm run dev
```

## Notes
- Branding and metadata now use **RichApps**.
- Integration scope is limited to Webhooks, Custom API, and Couriers.
- No marketplace/storefront connector placeholders are included.
