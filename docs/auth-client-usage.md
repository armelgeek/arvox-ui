# Utilisation des hooks de gestion de compte avec Better Auth

## Configuration du client Better Auth

```typescript
// auth-client.ts
import { createAuthClient } from 'better-auth/react';
import type { BetterAuthClient } from 'arvox-ui';

// Configuration du client Better Auth
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000',
});

// Adapter pour l'interface BetterAuthClient d'Arvox UI
export const arvoxAuthClient: BetterAuthClient = {
  changePassword: async (data) => {
    try {
      const result = await authClient.changePassword(data);
      return { user: result.data.user };
    } catch (error) {
      return { error: { message: error.message } };
    }
  },
  
  updateUser: async (data) => {
    try {
      const result = await authClient.updateUser(data);
      return { user: result.data.user };
    } catch (error) {
      return { error: { message: error.message } };
    }
  },
  
  getSession: async () => {
    try {
      const result = await authClient.getSession();
      return result.data;
    } catch (error) {
      return null;
    }
  },
};
```

## Utilisation dans les composants

```typescript
// components/ProfileForm.tsx
import { useChangePassword, useUpdateProfile } from 'arvox-ui';
import { arvoxAuthClient } from '../lib/auth-client';

export function ProfileForm() {
  const changePassword = useChangePassword(arvoxAuthClient);
  const updateProfile = useUpdateProfile(arvoxAuthClient);

  const handleChangePassword = async (data) => {
    try {
      await changePassword.mutateAsync(data);
      // Succès
    } catch (error) {
      // Erreur
    }
  };

  const handleUpdateProfile = async (data) => {
    try {
      await updateProfile.mutateAsync(data);
      // Succès
    } catch (error) {
      // Erreur
    }
  };

  // ... rest of component
}
```

## Avec un Provider personnalisé

```typescript
// contexts/AuthContext.tsx
import { createContext, useContext } from 'react';
import type { BetterAuthClient } from 'arvox-ui';
import { arvoxAuthClient } from '../lib/auth-client';

const AuthContext = createContext<BetterAuthClient>(arvoxAuthClient);

export function AuthProvider({ children }) {
  return (
    <AuthContext.Provider value={arvoxAuthClient}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthClient() {
  return useContext(AuthContext);
}
```

```typescript
// components/ProfileForm.tsx (avec contexte)
import { useChangePassword } from 'arvox-ui';
import { useAuthClient } from '../contexts/AuthContext';

export function ProfileForm() {
  const authClient = useAuthClient();
  const changePassword = useChangePassword(authClient);

  // ... rest of component
}
```
