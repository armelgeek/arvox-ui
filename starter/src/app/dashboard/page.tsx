import { 
  Button, 
  Card, 
  CardContent, 
  CardTitle, 
  Typography,
  Badge
} from 'arvox-ui'

export default function DashboardPage() {
  const stats = [
    { title: 'Utilisateurs actifs', value: '1,234', change: '+12%', positive: true },
    { title: 'Revenus', value: '€45,678', change: '+8.2%', positive: true },
    { title: 'Commandes', value: '89', change: '-3.1%', positive: false },
    { title: 'Taux de conversion', value: '3.24%', change: '+0.5%', positive: true },
  ]

  const recentActivities = [
    { user: 'Marie Dupont', action: 'a créé un nouveau projet', time: 'il y a 2 min' },
    { user: 'Pierre Martin', action: 'a mis à jour son profil', time: 'il y a 5 min' },
    { user: 'Sophie Bernard', action: 'a complété une tâche', time: 'il y a 10 min' },
    { user: 'Jean Moreau', action: 'a ajouté un commentaire', time: 'il y a 15 min' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <Typography variant="h2">Dashboard</Typography>
              <Typography variant="body" className="text-gray-600">
                Bienvenue dans votre espace d'administration
              </Typography>
            </div>
            <Button>Nouvelle action</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="small" className="text-gray-600 mb-1">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" className="font-bold">
                      {stat.value}
                    </Typography>
                  </div>
                  <Badge variant={stat.positive ? 'success' : 'error'}>
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <Card>
            <CardTitle title="Activités récentes" />
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-600">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography variant="small" className="font-medium">
                        {activity.user}
                      </Typography>
                      <Typography variant="caption" className="text-gray-600">
                        {activity.action} • {activity.time}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardTitle title="Actions rapides" />
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">👥</span>
                  <Typography variant="small">Gérer les utilisateurs</Typography>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">📊</span>
                  <Typography variant="small">Voir les rapports</Typography>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">⚙️</span>
                  <Typography variant="small">Paramètres</Typography>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <span className="text-2xl mb-2">💬</span>
                  <Typography variant="small">Support</Typography>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
