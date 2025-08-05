'use client'

import { Button, Card, CardContent, CardTitle, Input, Typography } from 'arvox-ui'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement authentication logic
    console.log('Login attempt:', { email, password })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Typography variant="h2" className="mb-2">
            Connexion
          </Typography>
          <Typography variant="body" className="text-gray-600">
            Connectez-vous à votre compte
          </Typography>
        </div>

        <Card>
          <CardTitle title="Se connecter" />
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <Typography variant="small" className="text-gray-600">
                    Se souvenir de moi
                  </Typography>
                </label>
                <button type="button" className="text-sm text-blue-600 hover:underline">
                  Mot de passe oublié ?
                </button>
              </div>

              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Typography variant="small" className="text-gray-600">
                Pas encore de compte ?{' '}
                <button className="text-blue-600 hover:underline">
                  S'inscrire
                </button>
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
