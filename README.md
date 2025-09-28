# 3-Tier App (React / Node / Mongo / Redis)


## Local (docker-compose)


1. Copy `.env.example` to `.env` and edit if needed.
2. Run: `docker-compose up --build`
3. Open `http://localhost` — the React app will be served by nginx and requests to `/api/*` will be proxied to the backend.


## Development


- Backend: `cd server && npm install && npm run dev` (requires nodemon). Backend default port: 5000
- Frontend: `cd client && npm install && npm run dev` (Vite dev server). If running Vite, set `VITE_API_URL=http://localhost:5000` or call relative `/api` paths.


## Sample API


- `GET /api/items` — returns items (cached in Redis)
- `POST /api/items` — create item (invalidates cache)
