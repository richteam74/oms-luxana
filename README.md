# Luxana-style OMS (Next.js + Prisma)

Production-oriented full-stack Order Management System for Malaysian COD operations.

## Stack
- Next.js 15 (App Router) + TypeScript
- PostgreSQL + Prisma ORM
- NextAuth credential auth with role model (`super_admin`, `admin`, `staff`, `seller`)
- Tailwind CSS dark navy admin theme
- Recharts analytics, lucide-react ready

## Features Implemented
- Admin shell with dark premium layout and sidebar navigation
- Analytics dashboard cards + charts
- Orders listing with status badges and seller/customer columns
- Create order page (single + bulk CSV UX)
- Shipment module pages and inventory module pages
- Public checkout integration endpoint `POST /api/public/orders`
- Duplicate prevention by phone + address + same day
- Courier abstraction: `JntCourierProvider`, `SpxCourierProvider`, `MockCourierProvider`
- AWB generation endpoint and shipment record updates
- Courier webhooks with event-to-order-status mapping
- Finance and commission reporting APIs
- Prisma schema with required OMS entities
- Malaysian realistic seed data

## Quick Start
1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client and migrate:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```
4. Seed data:
   ```bash
   npm run prisma:seed
   ```
5. Run app:
   ```bash
   npm run dev
   ```

## Default Seed Login
- Email: `superadmin@luxana.my`
- Password: `Admin@123`

## Important API Endpoints
- `POST /api/public/orders`
- `GET /api/dashboard`
- `GET /api/orders`
- `GET /api/products`
- `POST /api/shipments/generate-awb`
- `POST /api/webhooks/courier/jnt`
- `POST /api/webhooks/courier/spx`
- `GET /api/finance`
- `GET /api/commission`

## Notes
- Providers are mock-friendly; swap internal implementations with live courier APIs.
- Role filtering logic (seller restricted orders) should be applied in query layer based on session user role.
- Labels are in English and can be moved to i18n dictionaries for customization.
