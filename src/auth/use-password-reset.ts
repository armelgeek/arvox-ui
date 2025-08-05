import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AuthClient {
  forgetPassword: (data: { email: string }) => Promise<void>;
  resetPassword: (data: { newPassword: string; token: string }) => Promise<void>;
}

interface UseForgotPasswordConfig {
  authClient: AuthClient;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useForgotPassword(config: UseForgotPasswordConfig) {
  const { authClient, onSuccess, onError } = config;

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authClient.forgetPassword({ email }),
    onSuccess: () => {
      toast.success('Instructions de réinitialisation envoyées par email');
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de l\'envoi de l\'email');
      onError?.(error);
    }
  });

  return {
    sendResetEmail: forgotPasswordMutation.mutate,
    isSending: forgotPasswordMutation.isPending,
    error: forgotPasswordMutation.error,
    isSuccess: forgotPasswordMutation.isSuccess,
    reset: forgotPasswordMutation.reset
  };
}

interface UseResetPasswordConfig {
  authClient: AuthClient;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useResetPassword(config: UseResetPasswordConfig) {
  const { authClient, onSuccess, onError } = config;

  const resetPasswordMutation = useMutation({
    mutationFn: (data: { newPassword: string; token: string }) => 
      authClient.resetPassword(data),
    onSuccess: () => {
      toast.success('Mot de passe réinitialisé avec succès');
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la réinitialisation');
      onError?.(error);
    }
  });

  return {
    resetPassword: resetPasswordMutation.mutate,
    isResetting: resetPasswordMutation.isPending,
    error: resetPasswordMutation.error,
    isSuccess: resetPasswordMutation.isSuccess,
    reset: resetPasswordMutation.reset
  };
}
