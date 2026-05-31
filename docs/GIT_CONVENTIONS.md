# Git Conventions CryptoWatch

## Branches

```txt
main          # stable
└── feat/     # nouvelle fonctionnalité
└── fix/      # bug correction
└── chore/    # config, dependencies, tooling
└── docs/     # documentation
```

**Rule :** one branch = one fonctionality. Merge in `main` when feature is done and tested.

---

## Commits, Convention Conventional Commits

### Format

```txt
<type>(<scope>): <short description>
```

### Types

| Type | use when |
| --- | --- |
| `feat` | a new feature is visible |
| `fix` | Correcting a bug |
| `style` | CSS/SCSS only, no logic |
| `refactor` | Renaming without changing behaviors |
| `chore` | Config, packages, .gitignore, scripts |
| `docs` | README, ARCHITECTURE, comments |
| `test` | Adding or modifying tests |

### Scopes

`dashboard` · `detail` · `favorites` · `search` · `api` · `backend` · `auth` · `chart` · `routing`

### Concrets examples for this project

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

### Rules

- **Commit in english** it's the convention
- **Description ≤ 72 char**, no end point and no caps
- **commit = logic changes**, if you have to write "and" in the message, it's probably worth two commits
- **DO NOT COMMIT**: `node_modules/`, `.env`, `*.db`, and build files (`dist/`)

---
