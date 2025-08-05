# @arvox/ui

Bibliothèque UI réutilisable pour les projets Arvox avec authentification Better Auth intégrée.

## 🚀 Fonctionnalités

### 🔐 Authentification Better Auth Complète
- **Session Management** : Gestion de session native Better Auth (sans TanStack Query)
- **Authentication Flows** : Connexion, inscription, OTP, mot de passe oublié
- **Account Management** : Changement de mot de passe, mise à jour profil, suppression compte
- **Security Features** : 2FA, vérification email, "Se souvenir de moi"
- **Types & Schemas** : Validation Zod complète pour tous les formulaires

### 🧩 Composants UI
- **Button** : Système de variants avec class-variance-authority
- **Card** : Composants structurés (Header, Content, Footer)
- **Input & Forms** : Inputs contrôlés avec React Hook Form
- **Dialog** : Modales accessibles avec Radix UI
- **Spinner & Loader** : Indicateurs de chargement configurables
- **Badge** : Badges avec variants (success, warning, error, info)
- **Typography** : Système de typographie unifié

### 🪝 Hooks Avancés
- **Authentication** : useAuth, useOTPAuth, useRememberMe, useTwoFactorAuth
- **Data Management** : useMutations, useDataQuery, useApiMutation
- **UI Interactions** : useClickOutside, useWindowSize, useMediaQuery
- **Utilities** : useDebounce, useCopyToClipboard, useInterval, useTimeout
- **Storage** : useLocalStorage, useSession avec invalidation intelligente

### 🛠️ Utilitaires
- **Dates** : formatDate, formatRelativeTime, isToday, addDays
- **URLs** : buildUrl, parseUrlParams, updateUrlParams
- **Text** : capitalize, truncate, slugify, formatCurrency
- **Validation** : email, password, phone avec messages français
- **Styles** : cn() pour merge de classes Tailwind

## 📦 Installation

```bash
pnpm add @arvox/ui
```

### Peer Dependencies

```bash
pnpm add react@^19 react-dom@^19 @tanstack/react-query@^5 react-router@^7 react-hook-form@^7 zod@^3 better-auth@^1 sonner@^1 tailwindcss@^3 @radix-ui/react-dialog@^1
```

## 🎯 Usage Rapide

### Configuration Better Auth

```tsx
import { useAuth, useBetterAuthSession } from '@arvox/ui';
import { betterAuthClient } from './auth-config';

function App() {
  // Session Better Auth native
  const session = useBetterAuthSession({
    getSession: betterAuthClient.getSession,
    refetchInterval: 5 * 60 * 1000
  });

  // Hook d'authentification complet
  const auth = useAuth({
    authClient: betterAuthClient,
    onSuccess: {
      signIn: (data) => console.log('Connecté:', data.user),
      signOut: () => navigate('/login')
    }
  });

  return (
    <div>
      {session.isAuthenticated ? (
        <Dashboard user={session.user} onLogout={auth.signOut} />
      ) : (
        <LoginForm onLogin={auth.signIn} />
      )}
    </div>
  );
}
```

### Composants UI

```tsx
import { Button, Card, Dialog, Badge, Spinner } from '@arvox/ui';

function ExamplePage() {
  return (
    <Card>
      <Card.Header>
        <h2>Dashboard</h2>
        <Badge variant="success">En ligne</Badge>
      </Card.Header>
      
      <Card.Content>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button variant="primary" size="normal">
              Ouvrir Modal
            </Button>
          </Dialog.Trigger>
          
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Confirmation</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Spinner size="lg" />
              <p>Traitement en cours...</p>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Root>
      </Card.Content>
    </Card>
  );
}
```

### Hooks de Données

```tsx
import { useMutations, useDataQuery } from '@arvox/ui';

function UserManagement() {
  // Query avec pagination automatique
  const users = useDataQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    pagination: { page: 1, limit: 10 }
  });

  // Mutations CRUD automatisées
  const userMutations = useMutations({
    service: userService,
    queryKeys: {
      lists: () => ['users'],
      all: ['users']
    },
    successMessages: {
      create: 'Utilisateur créé avec succès',
      update: 'Utilisateur modifié',
      delete: 'Utilisateur supprimé'
    }
  });

  return (
    <div>
      {users.data?.map(user => (
        <div key={user.id}>
          <span>{user.name}</span>
          <Button 
            onClick={() => userMutations.remove(user.id)}
            disabled={userMutations.isRemoving}
          >
            Supprimer
          </Button>
        </div>
      ))}
    </div>
  );
}
```

### Hooks d'Authentification

```tsx
import { 
  useForgotPassword, 
  useChangePassword, 
  useRememberMe,
  useTwoFactorAuth 
} from '@arvox/ui';

function AccountSettings() {
  const rememberMe = useRememberMe();
  const changePassword = useChangePassword({ authClient });
  const twoFactor = useTwoFactorAuth({ authClient });
  
  return (
    <div>
      {/* Se souvenir de moi */}
      <label>
        <input 
          type="checkbox"
          checked={rememberMe.isEnabled}
          onChange={(e) => rememberMe.saveCredentials(
            userEmail, 
            e.target.checked
          )}
        />
        Se souvenir de moi
      </label>

      {/* 2FA */}
      <div>
        <h3>Authentification à deux facteurs</h3>
        {twoFactor.isEnabled ? (
          <Button onClick={() => twoFactor.disable(password)}>
            Désactiver 2FA
          </Button>
        ) : (
          <Button onClick={() => twoFactor.enable()}>
            Activer 2FA
          </Button>
        )}
        {twoFactor.qrCode && (
          <img src={twoFactor.qrCode} alt="QR Code 2FA" />
        )}
      </div>
    </div>
  );
}
```

### Hooks Utilitaires

```tsx
import { 
  useClickOutside, 
  useDebounce, 
  useCopyToClipboard,
  useWindowSize 
} from '@arvox/ui';

function UtilityExample() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { copy, copied } = useCopyToClipboard();
  const { width, height } = useWindowSize();
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div>
      <p>Taille écran: {width}x{height}</p>
      
      <input 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher..."
      />
      <p>Recherche: {debouncedSearch}</p>

      <Button onClick={() => copy('Texte à copier')}>
        {copied ? 'Copié!' : 'Copier'}
      </Button>

      <div ref={dropdownRef}>
        <Button onClick={() => setIsOpen(!isOpen)}>
          Menu {isOpen ? '↑' : '↓'}
        </Button>
        {isOpen && (
          <div>Menu items...</div>
        )}
      </div>
    </div>
  );
}
```

### Utilitaires

```tsx
import { 
  formatDateAdvanced, 
  formatRelativeTime, 
  buildUrl, 
  cn,
  capitalize,
  isValidEmail 
} from '@arvox/ui';

function UtilsExample() {
  const date = new Date();
  const url = buildUrl('/api/users', { page: 1, search: 'john' });
  
  return (
    <div className={cn('card', 'p-4', isActive && 'active')}>
      <h2>{capitalize('titre du document')}</h2>
      <p>Créé: {formatRelativeTime(date)}</p>
      <p>Date: {formatDateAdvanced(date)}</p>
      <a href={url}>Voir utilisateurs</a>
      
      {isValidEmail('test@example.com') && (
        <p>Email valide</p>
      )}
    </div>
  );
}
```

## 🏗️ Architecture

### Structure de la Bibliothèque

```
packages/arvox-ui/
├── src/
│   ├── auth/              # Authentification Better Auth
│   │   ├── use-auth.ts           # Hook principal d'auth
│   │   ├── use-otp.ts            # Authentification OTP
│   │   ├── use-password-reset.ts # Mot de passe oublié
│   │   ├── use-remember-me.ts    # Se souvenir de moi
│   │   ├── use-two-factor.ts     # 2FA
│   │   ├── schemas.ts            # Validation Zod
│   │   └── types.ts              # Types TypeScript
│   ├── components/        # Composants UI
│   │   ├── button.tsx            # Button avec variants
│   │   ├── card.tsx              # Card structuré
│   │   ├── dialog.tsx            # Modales Radix UI
│   │   ├── input.tsx             # Inputs contrôlés
│   │   ├── spinner.tsx           # Chargement
│   │   └── badge.tsx             # Badges
│   ├── hooks/             # Hooks utilitaires
│   │   ├── use-mutations.ts      # CRUD automatisé
│   │   ├── use-data-query.ts     # Queries avec pagination
│   │   ├── use-debounce.ts       # Debounce
│   │   ├── use-clipboard.ts      # Copier/coller
│   │   └── use-window.ts         # Window size/media queries
│   └── utils/             # Utilitaires
│       ├── date.ts               # Manipulation dates
│       ├── url.ts                # Manipulation URLs
│       ├── text.ts               # Formatage texte
│       └── validation.ts         # Validation
├── package.json           # Configuration npm
└── README.md             # Documentation
```

### Philosophie de Design

1. **Better Auth First** : Session native sans surcouche TanStack Query
2. **Type Safety** : TypeScript strict avec Zod pour la validation
3. **Composabilité** : Hooks réutilisables et composants modulaires
4. **Performance** : Optimisations automatiques et lazy loading
5. **Accessibilité** : Radix UI pour les primitives accessibles
6. **Developer Experience** : Messages d'erreur français et API intuitive

## 📊 Bundle Size

- **ESM** : 46.64 KB (optimisé)
- **CJS** : 50.46 KB  
- **TypeScript definitions** : 31.67 KB
- **Build time** : ~2.5 secondes

## 🤝 Contribution

```bash
# Installation
pnpm install

# Développement
pnpm dev

# Build
pnpm build

# Type checking
pnpm type-check
```

## 📄 License

MIT - Arvox Team

---

**@arvox/ui** - Framework UI complet pour projets React avec Better Auth intégré 🚀
