# CryptoWatch Dashboard

> Real-time cryptocurrency dashboard built with Angular 21+ and Node.js/Express.

![Angular](https://img.shields.io/badge/Angular-21+-DD0031?style=flat-square&logo=angular)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)

---

## Features

- Live prices for the top 10 cryptocurrencies via CoinGecko API
- 7-day price chart per coin
- Favorites persisted server-side
- Real-time search with 300ms debounce
- Backend health indicator with 60s polling
- Dark / Light mode toggle

---

## Project Structure

```txt
cryptowatch-dashboard/
├── frontend/       # Angular 17+ SPA
├── backend/        # Node.js / Express REST API
├── docs/
│   ├── ARCHITECTURE.md
│   └── GIT_CONVENTIONS.md
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 24
- npm >= 11

### 1. Clone the repo

```bash
git clone https://github.com/Lallethu/cryptowatch-dashboard.git
cd cryptowatch-dashboard
```

### 2. Backend

```bash
cd backend
cp .env.example .env       # fill in your values
npm install
npm run dev                # starts on port 3000 by default
```

### 3. Frontend

```bash
cd frontend
npm install
npm run start              # ng serve
```

> Make sure the port in `frontend/src/environments/environment.ts` matches `PORT` in `backend/.env`.
> The proxy config lives in `frontend/src/proxy.conf.json` — update it if you change the backend port.

App is available at **<http://localhost:4200>**

---

## API Endpoints

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/ping` | Backend health check |
| `GET` | `/api/get_markets` | Top 10 cryptos |
| `GET` | `/api/market_chart/:id` | 7-day price history |
| `GET` | `/api/favorites` | List favorites (full coin objects) |
| `POST` | `/api/favorites` | Add a favorite `{ id: string }` |
| `DELETE` | `/api/favorites/:id` | Remove a favorite |

---

## Tech Stack

### Frontend

- Angular 17+ (standalone components, signals)
- ng2-charts + Chart.js
- RxJS
- SCSS

### Backend

- Node.js / Express
- Axios
- Favorites storage: JSON file (SQLite migration planned)

### External

- [CoinGecko API](https://www.coingecko.com/en/api), free tier

---

## Documentation

- [Architecture](./docs/ARCHITECTURE.md), folder structure, data flow, migration plan
- [Git Conventions](./docs/GIT_CONVENTIONS.md), branching, commit format, workflow
