import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

interface UseLogoutConfig {
  authClient: {
    signOut: () => Promise<void>;
  };
  clearSession?: () => void;
  redirectTo?: string;
  cachesToInvalidate?: string[][];
}

export function useLogout(config: UseLogoutConfig) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      // Invalider les caches spécifiques si fournis
      if (config.cachesToInvalidate) {
        await Promise.all(
          config.cachesToInvalidate.map(queryKey =>
            queryClient.invalidateQueries({ queryKey })
          )
        );
      }
      
      // Invalider tous les caches
      await queryClient.invalidateQueries();
      
      // Supprimer tous les caches
      queryClient.clear();
      
      // Supprimer la session si fournie
      if (config.clearSession) {
        config.clearSession();
      }
      
      // Déconnexion
      await config.authClient.signOut();
      
      // Redirection
      navigate(config.redirectTo || '/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    logout,
    isLoggingOut
  };
}
