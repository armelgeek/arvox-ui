import { Button, Card, CardContent, CardTitle, Typography } from '@arvox/ui'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Typography variant="h1" className="mb-4 text-gray-900">
            Bienvenue sur Arvox UI Starter
          </Typography>
          <Typography variant="body" className="text-gray-600 max-w-2xl mx-auto">
            Un template moderne pour créer rapidement des applications React avec Next.js et la bibliothèque de composants Arvox UI.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardTitle title="🚀 Démarrage rapide" />
            <CardContent>
              <Typography variant="small" className="text-gray-600 mb-4">
                Commencez immédiatement avec une configuration Next.js optimisée et tous les composants Arvox UI.
              </Typography>
              <Button className="w-full">
                Voir les composants
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardTitle title="🔐 Authentification" />
            <CardContent>
              <Typography variant="small" className="text-gray-600 mb-4">
                Système d'authentification complet avec Better Auth intégré et prêt à l'emploi.
              </Typography>
              <Button variant="outline" className="w-full">
                Tester l'auth
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardTitle title="📊 Dashboard" />
            <CardContent>
              <Typography variant="small" className="text-gray-600 mb-4">
                Interface d'administration moderne avec navigation et gestion des données.
              </Typography>
              <Button variant="secondary" className="w-full">
                Voir le dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Typography variant="h2" className="mb-8 text-gray-800">
            Fonctionnalités incluses
          </Typography>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              'Next.js 15',
              'TypeScript',
              'Tailwind CSS',
              'Arvox UI',
              'React Query',
              'Better Auth',
              'React Hook Form',
              'Responsive Design'
            ].map((feature) => (
              <div key={feature} className="bg-white p-4 rounded-lg shadow-sm">
                <Typography variant="small" className="font-medium text-gray-700">
                  {feature}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
