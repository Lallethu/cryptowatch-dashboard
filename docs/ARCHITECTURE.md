# Architecture — CryptoWatch

## Structure du monorepo

```txt
crypto-watch/
├── frontend/               # Application Angular
├── backend/                # Serveur Express
├── docs/
│   ├── ARCHITECTURE.md     # Ce fichier
│   └── GIT_CONVENTIONS.md
├── .gitignore
└── README.md
```

---

## Frontend — Angular 17+

```txt
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── services/
│   │   │       ├── crypto.service.ts       # Appels API vers le backend
│   │   │       └── favorites.service.ts    # CRUD favoris via le backend
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
│   │   ├── environment.ts          # dev pointe vers localhost:3000
│   │   └── environment.prod.ts     # prod pointe vers l'URL Railway
│   └── styles.scss                 # Variables CSS globales, reset
├── proxy.conf.json                 # Proxy dev backend :3000
└── angular.json
```

### Routing

| URL | Composant | Description |
| --- | --- | --- |
| `/` | DashboardComponent | Liste des 10 cryptos |
| `/detail/:id` | DetailComponent | Graphique + infos complètes |
| `/favorites` | FavoritesComponent | Cryptos sauvegardées |

### Règles Angular

- **Composants standalone** pas de NgModule
- **Pas de logique métier dans les composants** tout passe par les services
- **Async pipe** en priorité pour les Observables dans les templates
- **takeUntilDestroyed()** pour unsubscribe proprement dans les composants
- **Typage strict** pas de `any`, interfaces définies dans `core/models/`

---

## Backend — Node.js / Express

```txt
backend/
├── src/
│   ├── routes/
│   │   ├── crypto.routes.js        # Proxy CoinGecko
│   │   └── favorites.routes.js     # CRUD favoris
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

### Règles backend

- **Le backend est le seul à appeler CoinGecko**, Angular ne contacte jamais l'API externe directement
- **CORS** activé uniquement pour `localhost:4200` en dev
- **Variables d'environnement** dans `.env` (jamais committé), exemple dans `.env.example`

---

## Flux de données

```txt
Angular Component
      │
      ▼
  Service Angular  (crypto.service.ts / favorites.service.ts)
      │  HttpClient → /api/...
      ▼
  Express Backend
      │
      ├── /api/cryptos/*  ──►  CoinGecko API  (externe)
      │
      └── /api/favorites  ──►  favorites.json  (phase 1)
                          ──►  SQLite          (phase 2)
```

---

## Migration JSON, SQLite (Jour 4/5)

La migration est isolée dans `favorites.service.js`. Les routes et le reste du code n'ont pas à changer.

### **Phase 1 — JSON**

```js
// favorites.service.js
const fs = require('fs');
const PATH = './src/data/favorites.json';

const getAll = () => JSON.parse(fs.readFileSync(PATH));
const save   = (data) => fs.writeFileSync(PATH, JSON.stringify(data, null, 2));
```

### **Phase 2 — SQLite** (swap du service uniquement)

```js
// favorites.service.js
const Database = require('better-sqlite3');
const db = new Database('./src/data/favorites.db');

const getAll = () => db.prepare('SELECT * FROM favorites').all();
```

---

## Variables d'environnement

**`backend/.env`** (à créer localement, jamais committé)

```bash
PORT=3000
COINGECKO_BASE_URL=https://api.coingecko.com/api/v3
```

**`frontend/src/environments/environment.ts`**

```ts
export const environment = {
  production: false,
  apiUrl: '/api'   // résolu via proxy.conf.json en dev
}
```
