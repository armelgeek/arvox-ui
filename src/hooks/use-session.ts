import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseSessionConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  queryClient: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  navigate: any;
  storeClear?: () => void;
  customInvalidations?: string[][];
}

export function useSession(config: UseSessionConfig) {
  const { queryClient, navigate, storeClear, customInvalidations } = config;

  const login = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (userData: any) => {
      // Logic to be implemented by consumer
      return userData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['session'] });
      toast.success('Connexion réussie');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Erreur de connexion');
    }
  });

  const logout = useMutation({
    mutationFn: async () => {
      // Logic to be implemented by consumer
    },
    onSuccess: () => {
      // Clear all cache
      queryClient.clear();
      
      // Custom invalidations
      if (customInvalidations) {
        customInvalidations.forEach(queryKey => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
      
      // Clear local storage/store
      if (storeClear) {
        storeClear();
      }
      
      // Navigate to login
      navigate('/login');
      toast.success('Déconnexion réussie');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.message || 'Erreur de déconnexion');
    }
  });

  const session = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      // To be implemented by consumer
      return null;
    },
    retry: false,
    staleTime: 5 * 60 * 1000
  });

  return {
    login: login.mutate,
    isLoggingIn: login.isPending,
    logout: logout.mutate,
    isLoggingOut: logout.isPending,
    session: session.data,
    isLoadingSession: session.isLoading,
    invalidateSession: () => queryClient.invalidateQueries({ queryKey: ['session'] })
  };
}
