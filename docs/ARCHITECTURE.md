# Architecture CryptoWatch

## Structure du monorepo

```txt
crypto-watch/
├── frontend/               # Angular Application
├── backend/                # Express Server
├── docs/
│   ├── ARCHITECTURE.md     # This file
│   └── GIT_CONVENTIONS.md
├── .gitignore
└── README.md
```

---

## Frontend Angular 21+

```txt
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/
│   │   │       ├── crypto.service.ts       # API calls to the backend
│   │   │       └── favorites.service.ts    # CRUD favorite to consume backend API
│   │   ├── pages/
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.component.html
│   │   │   │   └── dashboard.component.scss
│   │   │   ├── detail/
│   │   │   │   ├── detail.component.ts
│   │   │   │   ├── detail.component.html
│   │   │   │   └── detail.component.scss
│   │   │   └── favorites/
│   │   │       ├── favorites.component.ts
│   │   │       ├── favorites.component.html
│   │   │       └── favorites.component.scss
│   │   ├── shared/
│   │   │   └── components/
│   │   │       ├── crypto-card/
│   │   │       │   ├── crypto-card.component.ts
│   │   │       │   ├── crypto-card.component.html
│   │   │       │   └── crypto-card.component.scss
│   │   │       ├── search-bar/
│   │   │       │   ├── search-bar.component.ts
│   │   │       │   └── search-bar.component.html
│   │   │       └── spinner/
│   │   │           └── spinner.component.ts
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   └── app.routes.ts
│   ├── environments/
│   │   └── environment.ts          # dev pointing on localhost:3000/api
│   └── styles.scss                 # globales SCSS
├── proxy.conf.json                 # Proxy dev backend :3000
└── angular.json
```

### Routing

| URL | Composant | Description |
| --- | --- | --- |
| `/` | DashboardComponent | Lists 10 cryptos |
| `/detail/:id` | DetailComponent | Graph + infos |
| `/favorites` | FavoritesComponent | Saved cryptos |

---

## Backend — Node.js / Express

```txt
backend/
├── src/
│   ├── routes/
│   │   ├── crypto.routes.js        # Proxy CoinGecko
│   │   └── favorites.routes.js     # CRUD favorites
│   ├── services/
│   │   ├── coingecko.service.js    # Appels HTTP vers CoinGecko
│   │   └── favorites.service.js    # Lecture/écriture du stockage
│   ├── data/
│   │   └── favorites.json          # Stockage initial (remplacé par SQLite)
│   └── server.js                    # Point d'entrée, config Express
├── .env.example
└── package.json
```

### Endpoints

| Méthode | Route | Description |
| --- | --- | --- |
| `GET` | `/api/ping` | Healthcheck |
| `GET` | `/api/cryptos` | Liste des 10 cryptos (CoinGecko) |
| `GET` | `/api/cryptos/:id` | Détail d'une crypto |
| `GET` | `/api/cryptos/:id/chart` | Historique 7 jours |
| `GET` | `/api/favorites` | Liste des favoris |
| `POST` | `/api/favorites` | Ajouter un favori `{ id, name, symbol }` |
| `DELETE` | `/api/favorites/:id` | Supprimer un favori |

### Backend rules

- **The backend only can call CoinGecko**, Angular should never directly contact externe API
- **CORS** are actif for `localhost:4200` in dev
- **Environments variable** dans `.env` (never commited), example in `backend/.env.example`

---

## Data Flux

```txt
Angular Component
      │
      ▼
  Service Angular  (crypto.service.ts / favorites.service.ts)
      │  HttpClient  ──►  /api/...
      ▼
  Express Backend
      │
      ├── /api/crypto/*  ──►  CoinGecko API  (extern)
      │
      └── /api/favorites  ──►  favorites.json
```
