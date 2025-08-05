'use client'

import { Button, Typography } from '@arvox/ui'

interface NavigationProps {
  currentPath?: string
}

export function Navigation({ currentPath }: NavigationProps) {
  const links = [
    { href: '/', label: 'Accueil', icon: '🏠' },
    { href: '/components', label: 'Composants', icon: '🧩' },
    { href: '/forms', label: 'Formulaires', icon: '📝' },
    { href: '/auth/login', label: 'Connexion', icon: '🔐' },
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
  ]

  const handleNavigation = (href: string) => {
    // In a real app, you would use Next.js router
    window.location.href = href
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Typography variant="h5" className="font-bold text-blue-600">
              Arvox UI Starter
            </Typography>
          </div>
          
          <div className="flex items-center space-x-1">
            {links.map((link) => (
              <Button
                key={link.href}
                variant={currentPath === link.href ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleNavigation(link.href)}
                className="flex items-center space-x-2"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
