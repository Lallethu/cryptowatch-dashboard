# Git Conventions — CryptoWatch

## Branches

```txt
main          # code stable, toujours deployable
└── feat/     # nouvelle fonctionnalité
└── fix/      # correction de bug
└── chore/    # config, dépendances, tooling
└── docs/     # documentation uniquement
```

### Nommage

```bash
feat/dashboard-crypto-list
feat/detail-page-chart
feat/favorites-crud
fix/refresh-interval-memory-leak
chore/setup-angular-proxy
docs/update-architecture
```

**Règle :** une branche = une fonctionnalité du Trello. On merge dans `main` quand la feature est finie et testée manuellement.

---

## Commits — Convention Conventional Commits

### Format

```txt
<type>(<scope>): <description courte>
```

### Types

| Type | Quand l'utiliser |
| --- | --- |
| `feat` | Nouvelle fonctionnalité visible |
| `fix` | Correction de bug |
| `style` | CSS/SCSS uniquement, pas de logique |
| `refactor` | Réécriture sans changer le comportement |
| `chore` | Config, packages, .gitignore, scripts |
| `docs` | README, ARCHITECTURE, commentaires |
| `test` | Ajout ou modification de tests |

### Scopes suggérés

`dashboard` · `detail` · `favorites` · `search` · `api` · `backend` · `auth` · `chart` · `routing`

### Exemples concrets pour ce projet

```bash
# Setup
chore: init angular project with standalone components
chore: init express server with cors and nodemon
chore(backend): add proxy config for angular dev server

# Features
feat(dashboard): display top 10 cryptos from backend
feat(dashboard): add 60s auto-refresh with setInterval
feat(detail): add 7-day price chart with ng2-charts
feat(favorites): add POST /api/favorites endpoint
feat(favorites): persist favorites to JSON file
feat(search): implement debounce 300ms with rxjs

# Fix
fix(dashboard): unsubscribe interval on component destroy
fix(backend): handle coingecko api timeout gracefully
fix(favorites): prevent duplicate entries on POST

# Refactor / chore
refactor(favorites): migrate storage from JSON to SQLite
style(dashboard): make crypto card grid responsive
docs: update ARCHITECTURE with sqlite migration section
```

### Règles

- **Commit en anglais** — c'est la convention universelle
- **Description courte ≤ 72 caractères**, en minuscules, sans point final
- **Un commit = un changement logique** — si tu dois écrire "and" dans le message, c'est probablement deux commits
- **Ne pas committer** : `node_modules/`, `.env`, `*.db`, fichiers de build (`dist/`)

---

## .gitignore, ce qui ne doit pas être commité

```gitignore
# Dépendances
node_modules/

# Build Angular
frontend/dist/

# Environnement
backend/.env
*.env

# Base de données locale
backend/src/data/*.db

# IDE
.vscode/
.idea/
*.DS_Store

# Logs
*.log
npm-debug.log*
```

---

## Workflow quotidien

```bash
# 1. Commencer une feature (depuis main à jour)
git checkout main
git pull
git checkout -b feat/favorites-crud

# 2. Travailler, committer au fur et à mesure
git add src/app/pages/favorites/
git commit -m "feat(favorites): add favorites page component"

git add backend/src/routes/favorites.routes.js
git commit -m "feat(favorites): add GET /api/favorites endpoint"

# 3. Une fois la feature terminée, merger dans main
git checkout main
git merge feat/favorites-crud

# 4. Supprimer la branche (optionnel mais propre)
git branch -d feat/favorites-crud
```

---

## Initial commit

Le premier commit du projet doit contenir uniquement la structure vide et la config de base :

```bash
git commit -m "chore: initial project structure"
```

Ce commit inclut : `README.md`, `.gitignore`, `docs/`, les dossiers `frontend/` et `backend/` vides ou avec leur `package.json` initial. Rien d'autre.
