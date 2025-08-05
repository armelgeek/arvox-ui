import { 
  Button, 
  Card, 
  CardContent, 
  CardTitle, 
  Input, 
  Typography, 
  LoadingButton,
  Badge,
  Spinner
} from 'arvox-ui'

export default function ComponentsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Typography variant="h1" className="mb-4">
            Showcase des Composants Arvox UI
          </Typography>
          <Typography variant="body" className="text-gray-600">
            Découvrez tous les composants disponibles dans la bibliothèque Arvox UI.
          </Typography>
        </div>

        <div className="grid gap-8">
          {/* Buttons Section */}
          <Card>
            <CardTitle title="Boutons" />
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button>Primaire</Button>
                <Button variant="secondary">Secondaire</Button>
                <Button variant="outline">Contour</Button>
                <Button variant="ghost">Fantôme</Button>
                <Button size="sm">Petit</Button>
                <Button size="lg">Grand</Button>
                <LoadingButton loading>Chargement</LoadingButton>
                <Button disabled>Désactivé</Button>
              </div>
            </CardContent>
          </Card>

          {/* Typography Section */}
          <Card>
            <CardTitle title="Typographie" />
            <CardContent>
              <div className="space-y-4">
                <Typography variant="h1">Titre H1</Typography>
                <Typography variant="h2">Titre H2</Typography>
                <Typography variant="h3">Titre H3</Typography>
                <Typography variant="h4">Titre H4</Typography>
                <Typography variant="h5">Titre H5</Typography>
                <Typography variant="h6">Titre H6</Typography>
                <Typography variant="body">Corps de texte normal</Typography>
                <Typography variant="small">Petit texte</Typography>
                <Typography variant="caption">Légende</Typography>
              </div>
            </CardContent>
          </Card>

          {/* Inputs Section */}
          <Card>
            <CardTitle title="Champs de saisie" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Champ de texte standard" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Mot de passe" />
                <Input disabled placeholder="Champ désactivé" />
              </div>
            </CardContent>
          </Card>

          {/* Badges Section */}
          <Card>
            <CardTitle title="Badges" />
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Badge par défaut</Badge>
                <Badge variant="primary">Primaire</Badge>
                <Badge variant="secondary">Secondaire</Badge>
                <Badge variant="success">Succès</Badge>
                <Badge variant="warning">Attention</Badge>
                <Badge variant="error">Erreur</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Loading Section */}
          <Card>
            <CardTitle title="Indicateurs de chargement" />
            <CardContent>
              <div className="flex items-center gap-8">
                <Spinner />
                <Spinner size="sm" />
                <Spinner size="lg" />
              </div>
            </CardContent>
          </Card>

          {/* Cards Section */}
          <Card>
            <CardTitle title="Cartes" />
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardTitle title="Carte exemple" subtitle="Avec sous-titre" />
                  <CardContent>
                    <Typography variant="small">
                      Ceci est le contenu d'une carte avec un titre et un sous-titre.
                    </Typography>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardTitle title="Avec actions" actions={
                    <Button size="sm">Action</Button>
                  } />
                  <CardContent>
                    <Typography variant="small">
                      Cette carte contient des actions dans le header.
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
