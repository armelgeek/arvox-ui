import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { User, Session } from './types';

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UpdateProfileData {
  name?: string;
  email?: string;
  image?: string;
  phone?: string;
}

// Better Auth client interface
export interface BetterAuthClient {
  changePassword: (data: { currentPassword: string; newPassword: string }) => Promise<{ user?: User; error?: { message: string } }>;
  updateUser: (data: { name?: string; image?: string }) => Promise<{ user?: User; error?: { message: string } }>;
  getSession: () => Promise<{ user: User; session: Session } | null>;
}

export function useChangePassword(authClient: BetterAuthClient) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ChangePasswordData) => {
      if (data.newPassword !== data.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas');
      }

      const response = await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.error) {
        throw new Error(response.error.message || 'Erreur lors du changement de mot de passe');
      }

      return response.user;
    },
    onSuccess: () => {
      // Invalider les queries liées à l'utilisateur
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Erreur lors du changement de mot de passe:', error);
    },
  });
}

export function useUpdateProfile(authClient: BetterAuthClient) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      const response = await authClient.updateUser({
        name: data.name,
        image: data.image,
      });

      if (response.error) {
        throw new Error(response.error.message || 'Erreur lors de la mise à jour du profil');
      }

      return response.user;
    },
    onSuccess: () => {
      // Invalider et refetch les données utilisateur
      queryClient.invalidateQueries({ queryKey: ['auth', 'session'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Erreur lors de la mise à jour du profil:', error);
    },
  });
}

export function useProfile(authClient: BetterAuthClient) {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const session = await authClient.getSession();
      
      if (!session?.user) {
        throw new Error('Utilisateur non connecté');
      }
      
      return session.user;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Ne pas retry si l'utilisateur n'est pas connecté
      if (error instanceof Error && error.message === 'Utilisateur non connecté') {
        return false;
      }
      return failureCount < 3;
    },
  });
}
