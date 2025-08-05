import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AuthClient {
  deleteUser: (data?: { password?: string }) => Promise<void>;
}

interface UseDeleteAccountConfig {
  authClient: AuthClient;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onConfirm?: () => Promise<boolean>; // Fonction de confirmation avant suppression
}

export function useDeleteAccount(config: UseDeleteAccountConfig) {
  const { authClient, onSuccess, onError, onConfirm } = config;

  const deleteAccountMutation = useMutation({
    mutationFn: async (password?: string) => {
      // Demander confirmation avant suppression
      if (onConfirm) {
        const confirmed = await onConfirm();
        if (!confirmed) {
          throw new Error('Suppression annulée par l\'utilisateur');
        }
      }
      
      return authClient.deleteUser(password ? { password } : undefined);
    },
    onSuccess: () => {
      toast.success('Compte supprimé avec succès');
      onSuccess?.();
    },
    onError: (error: Error) => {
      if (error.message !== 'Suppression annulée par l\'utilisateur') {
        toast.error(error.message || 'Erreur lors de la suppression du compte');
        onError?.(error);
      }
    }
  });

  return {
    deleteAccount: deleteAccountMutation.mutate,
    isDeleting: deleteAccountMutation.isPending,
    error: deleteAccountMutation.error,
    isSuccess: deleteAccountMutation.isSuccess,
    reset: deleteAccountMutation.reset
  };
}
