import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AuthClient {
  sendVerificationEmail: (data: { email: string }) => Promise<void>;
  verifyEmail: (data: { token: string }) => Promise<void>;
}

interface UseEmailVerificationConfig {
  authClient: AuthClient;
  onSuccess?: (action: 'send' | 'verify') => void;
  onError?: (error: Error, action: 'send' | 'verify') => void;
}

export function useEmailVerification(config: UseEmailVerificationConfig) {
  const { authClient, onSuccess, onError } = config;

  const sendVerificationMutation = useMutation({
    mutationFn: (email: string) => authClient.sendVerificationEmail({ email }),
    onSuccess: () => {
      toast.success('Email de vérification envoyé');
      onSuccess?.('send');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de l\'envoi de l\'email');
      onError?.(error, 'send');
    }
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (token: string) => authClient.verifyEmail({ token }),
    onSuccess: () => {
      toast.success('Email vérifié avec succès');
      onSuccess?.('verify');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la vérification');
      onError?.(error, 'verify');
    }
  });

  return {
    sendVerificationEmail: sendVerificationMutation.mutate,
    verifyEmail: verifyEmailMutation.mutate,
    isSendingVerification: sendVerificationMutation.isPending,
    isVerifyingEmail: verifyEmailMutation.isPending,
    sendError: sendVerificationMutation.error,
    verifyError: verifyEmailMutation.error,
    isSendSuccess: sendVerificationMutation.isSuccess,
    isVerifySuccess: verifyEmailMutation.isSuccess,
    resetSend: sendVerificationMutation.reset,
    resetVerify: verifyEmailMutation.reset
  };
}
