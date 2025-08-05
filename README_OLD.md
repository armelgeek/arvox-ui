# @arvox/ui

Bibliothèque UI réutilisable pour les projets Arvox, basée sur React, TypeScript et Tailwind CSS.

## Installation

```bash
npm install @arvox/ui
# ou
yarn add @arvox/ui
# ou
pnpm add @arvox/ui
```

## Utilisation

### Hooks

#### useLogout
Hook pour gérer la déconnexion avec invalidation automatique des caches React Query.

```tsx
import { useLogout } from '@arvox/ui';
import { authClient } from './auth';

function LogoutButton() {
  const { logout, isLoggingOut } = useLogout({
    authClient,
    clearSession: () => sessionStore.clear(),
    redirectTo: '/login',
    cachesToInvalidate: [
      ['user'],
      ['subscriptions'],
      ['modules']
    ]
  });

  return (
    <button onClick={logout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Déconnexion...' : 'Se déconnecter'}
    </button>
  );
}
```

#### useMutations
Hook pour simplifier les mutations CRUD avec React Query.

```tsx
import { useMutations } from '@arvox/ui';

function UserActions() {
  const mutations = useMutations({
    service: userService,
    queryKeys: userQueryKeys,
    successMessages: {
      create: 'Utilisateur créé avec succès',
      update: 'Utilisateur modifié',
      delete: 'Utilisateur supprimé'
    }
  });

  return (
    <div>
      <button onClick={() => mutations.create(userData)}>
        Créer
      </button>
    </div>
  );
}
```

#### useDebounce
Hook pour débouncer une valeur.

```tsx
import { useDebounce } from '@arvox/ui';

function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  useEffect(() => {
    // Effectuer la recherche avec debouncedSearch
  }, [debouncedSearch]);

  return <input onChange={(e) => setSearchTerm(e.target.value)} />;
}
```

### Utilitaires

```tsx
import { truncateText, formatDisplayName, cn, handleApiError } from '@arvox/ui';

// Tronquer du texte
const shortText = truncateText('Très long texte...', 20);

// Formater un nom d'affichage
const displayName = formatDisplayName('John', 'Doe', 25);

// Combiner des classes CSS
const className = cn('base-class', condition && 'conditional-class');

// Gérer les erreurs API
const errorMessage = handleApiError(apiError);
```

### Types

```tsx
import type { HasId, PaginatedResponse, ApiResponse, BaseService } from '@arvox/ui';

interface User extends HasId {
  name: string;
  email: string;
}

const userService: BaseService<User, CreateUserPayload> = {
  // Implémentation du service
};
```

## Configuration

### Peer Dependencies

Cette bibliothèque nécessite les dépendances suivantes dans votre projet :

- React >=18
- @tanstack/react-query >=5
- react-router >=7
- react-hook-form >=7
- zod >=3
- zustand >=4
- tailwindcss >=3

### Tailwind CSS

Ajoutez le chemin de la bibliothèque à votre configuration Tailwind :

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@arvox/ui/dist/**/*.{js,ts,jsx,tsx}'
  ],
  // ...
};
```

## Architecture

```
@arvox/ui/
├── src/
│   ├── components/     # Composants UI réutilisables
│   ├── hooks/          # Hooks React personnalisés
│   ├── utils/          # Fonctions utilitaires
│   ├── types.ts        # Types TypeScript partagés
│   └── index.ts        # Point d'entrée principal
├── package.json
├── tsconfig.json
└── tsup.config.ts
```

## Développement

```bash
# Installation des dépendances
pnpm install

# Build en mode watch
pnpm dev

# Build de production
pnpm build

# Vérification des types
pnpm type-check
```

## Licence

MIT
