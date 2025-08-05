# Arvox UI Starter

Un template moderne Next.js avec la bibliothèque de composants Arvox UI, prêt pour le développement d'applications web modernes.

## 🚀 Fonctionnalités

- ⚡️ **Next.js 15** - Framework React moderne avec App Router
- 🎨 **Arvox UI** - Bibliothèque de composants réutilisables
- 🎯 **TypeScript** - Typage statique pour une meilleure DX
- 💨 **Tailwind CSS** - Framework CSS utilitaire
- 🔍 **React Query** - Gestion d'état et de cache pour les API
- 🔐 **Better Auth** - Authentification moderne
- 📝 **React Hook Form** - Gestion de formulaires performante
- 🧪 **Zod** - Validation de schémas TypeScript
- 🎭 **Zustand** - Gestion d'état simple et efficace

## 📦 Installation

1. **Cloner ou copier ce template**
   ```bash
   # Copier les fichiers dans votre nouveau projet
   cp -r starter/ mon-nouveau-projet/
   cd mon-nouveau-projet/
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Configurer arvox-ui**
   
   Assurez-vous que la bibliothèque `arvox-ui` est disponible. Si vous développez en local :
   ```bash
   # Dans le répertoire parent contenant arvox-ui
   pnpm install
   pnpm build # dans le package arvox-ui
   ```

4. **Lancer le serveur de développement**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

5. **Ouvrir votre navigateur**
   
   Visitez [http://localhost:3000](http://localhost:3000) pour voir votre application.

## 📁 Structure du projet

```
src/
├── app/                    # App Router Next.js
│   ├── auth/
│   │   └── login/         # Page de connexion
│   ├── components/        # Showcase des composants
│   ├── dashboard/         # Interface d'administration
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── providers.tsx      # Providers React Query, etc.
└── components/
    └── navigation.tsx     # Composant de navigation
```

## 🎨 Composants disponibles

Le starter inclut des exemples d'utilisation de tous les composants Arvox UI :

- **Boutons** - Variantes primaire, secondaire, outline, ghost
- **Cartes** - Conteneurs flexibles avec headers et actions
- **Typographie** - Système de texte cohérent
- **Champs de saisie** - Inputs stylisés et accessibles
- **Badges** - Indicateurs colorés
- **Spinners** - Indicateurs de chargement
- **Dialogs** - Modales et overlays

## 🔐 Authentification

Le template inclut une page de connexion de base. Pour l'authentification complète :

1. Configurez Better Auth selon vos besoins
2. Ajoutez vos providers d'authentification
3. Configurez les hooks d'authentification d'Arvox UI

## 📊 Dashboard

Un dashboard exemple est fourni avec :
- Statistiques en temps réel
- Activités récentes
- Actions rapides
- Navigation intuitive

## 🛠️ Personnalisation

### Thème Tailwind

Modifiez `tailwind.config.js` pour personnaliser les couleurs et styles :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Vos couleurs personnalisées
      }
    }
  }
}
```

### Composants Arvox UI

Les composants sont configurés pour utiliser le système de design Arvox. Consultez la documentation d'arvox-ui pour les options de personnalisation.

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation React Query](https://tanstack.com/query/latest)
- [Documentation Better Auth](https://better-auth.com)

## 🤝 Contribution

Ce template est conçu pour être un point de départ. N'hésitez pas à l'adapter selon vos besoins et à contribuer aux améliorations.

## 📄 Licence

MIT License - utilisez librement pour vos projets.
