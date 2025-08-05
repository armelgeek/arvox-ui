'use client'

import { Button, Card, CardContent, CardTitle, Input, Typography } from '@arvox/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  company: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
})

type FormData = z.infer<typeof formSchema>

export default function FormsPage() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data: FormData) => {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log('Form submitted:', data)
    reset()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Typography variant="h1" className="mb-4">
            Formulaires avec React Hook Form
          </Typography>
          <Typography variant="body" className="text-gray-600">
            Exemple d'intégration avec Zod pour la validation et les composants Arvox UI.
          </Typography>
        </div>

        <Card>
          <CardTitle title="Formulaire de contact" />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom *
                  </label>
                  <Input
                    id="firstName"
                    {...register('firstName')}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <Typography variant="caption" className="text-red-500 mt-1">
                      {errors.firstName.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Nom *
                  </label>
                  <Input
                    id="lastName"
                    {...register('lastName')}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <Typography variant="caption" className="text-red-500 mt-1">
                      {errors.lastName.message}
                    </Typography>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <Typography variant="caption" className="text-red-500 mt-1">
                    {errors.email.message}
                  </Typography>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Téléphone *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="06 12 34 56 78"
                  />
                  {errors.phone && (
                    <Typography variant="caption" className="text-red-500 mt-1">
                      {errors.phone.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Entreprise
                  </label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder="Mon Entreprise"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre message..."
                />
                {errors.message && (
                  <Typography variant="caption" className="text-red-500 mt-1">
                    {errors.message.message}
                  </Typography>
                )}
              </div>

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => reset()}
                >
                  Réinitialiser
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8">
          <Card>
            <CardTitle title="Avantages de cette approche" />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-green-500">✓</span>
                  <Typography variant="small">
                    <strong>Validation TypeScript</strong> - Zod génère automatiquement les types
                  </Typography>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500">✓</span>
                  <Typography variant="small">
                    <strong>Performance optimisée</strong> - React Hook Form minimise les re-renders
                  </Typography>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500">✓</span>
                  <Typography variant="small">
                    <strong>UX moderne</strong> - Validation en temps réel avec messages d'erreur
                  </Typography>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-green-500">✓</span>
                  <Typography variant="small">
                    <strong>Accessibilité</strong> - Labels et associations automatiques
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
