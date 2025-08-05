# Déploiement Arvox UI

## Configuration requise

### Secrets GitHub à configurer

1. `NPM_TOKEN` - Token d'authentification npm pour publier le package
   - Aller sur [npm.com](https://npmjs.com) → Account Settings → Access Tokens
   - Créer un token avec les permissions "Automation"
   - Ajouter le token dans GitHub → Settings → Secrets and variables → Actions

### Publication automatique

La publication se fait automatiquement dans les cas suivants :

1. **Push sur la branche master** : Publication automatique avec bump de version patch
2. **Déclenchement manuel** : Via GitHub Actions avec choix du type de version

### Publication manuelle

1. Aller dans l'onglet "Actions" de votre dépôt GitHub
2. Sélectionner le workflow "CI/CD Arvox UI"
3. Cliquer sur "Run workflow"
4. Choisir le type de version (patch, minor, major, prerelease)
5. Cliquer sur "Run workflow"

### Commandes locales

```bash
# Install dependencies
pnpm install

# Type check
pnpm type-check

# Build
pnpm build

# Publication locale (après build)
npm publish --access public
```

## Structure des versions

- **patch** : 1.0.0 → 1.0.1 (corrections de bugs)
- **minor** : 1.0.0 → 1.1.0 (nouvelles fonctionnalités compatibles)
- **major** : 1.0.0 → 2.0.0 (changements incompatibles)
- **prerelease** : 1.0.0 → 1.0.1-0 (version de développement)

## Prérequis pour le package

Le package arvox-ui nécessite les peer dependencies suivantes dans le projet qui l'utilise :

```json
{
  "react": ">=18",
  "react-dom": ">=18",
  "@tanstack/react-query": ">=5",
  "react-router": ">=7",
  "react-hook-form": ">=7",
  "@hookform/resolvers": ">=3",
  "zod": ">=3",
  "zustand": ">=4",
  "tailwindcss": ">=3",
  "@radix-ui/react-dialog": ">=1",
  "better-auth": ">=1",
  "sonner": ">=1"
}
```
