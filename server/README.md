# Backend (Node + Express + PostgreSQL)

This folder hosts the API for the Sasta Bazar storefront. It exposes product, order and payment endpoints, persists data to PostgreSQL (if configured) and simulates Easypaisa payments for local development.

## Quick Start

```bash
cd server
cp env.example .env
npm install
npm run dev
```

Environment variables (`env.example`) include:

| Name | Purpose |
| --- | --- |
| `PORT` | API port (defaults to `4000`) |
| `DATABASE_URL` | PostgreSQL connection string |
| `PGSSLMODE` | Set to `require` for managed DBs with SSL |
| `FRONTEND_URL` | Allowed CORS origin (Vite dev server by default) |
| `EASYPAISA_WEBHOOK_SECRET` | Secret used to validate webhook calls |

## Database

1. Create a database (e.g. `createdb new_valve`).
2. Run the schema found in `db/schema.sql`.
3. Export `DATABASE_URL` pointing to that database.

The API falls back to an in-memory store if no database connection string is supplied, so you can still develop without PostgreSQL running.

## Available Routes

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check plus DB status |
| `GET` | `/api/products` | List catalogue products |
| `POST` | `/api/orders` | Create an order from cart contents |
| `GET` | `/api/orders/:orderId` | Fetch order status |
| `POST` | `/api/payments/easypaisa/simulate` | Simulate customer payment |
| `POST` | `/api/payments/webhook/easypaisa` | Endpoint for real Easypaisa webhooks |

## Payment Flow

1. Frontend posts cart items to `/api/orders` → receives `orderId`.
2. When the customer pays, the frontend calls `/api/payments/easypaisa/simulate` with `orderId` + amount.
3. The simulator auto-approves payments that match the order total (±1 PKR). Others remain `pending-review`.
4. In production, configure Easypaisa to hit `/api/payments/webhook/easypaisa` with the `EASYPAISA_WEBHOOK_SECRET` header so orders are confirmed automatically.

