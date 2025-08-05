#!/bin/bash

# Script de démarrage rapide pour Arvox UI Starter

echo "🚀 Initialisation du projet Arvox UI Starter..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/"
    exit 1
fi

# Vérifier si pnpm est installé
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installation de pnpm..."
    npm install -g pnpm
fi

echo "📦 Installation des dépendances..."
pnpm install

echo "🔨 Vérification de la build..."
pnpm run build

echo "✅ Projet initialisé avec succès !"
echo ""
echo "🎉 Prochaines étapes :"
echo "  1. Lancez le serveur de développement : pnpm dev"
echo "  2. Ouvrez http://localhost:3000 dans votre navigateur"
echo "  3. Commencez à développer votre application !"
echo ""
echo "📚 Ressources utiles :"
echo "  - README.md : Documentation complète"
echo "  - /components : Showcase des composants"
echo "  - /forms : Exemples de formulaires"
echo "  - /dashboard : Interface d'administration"
