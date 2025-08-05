import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { VerifyOTPCredentials } from './types';

interface UseVerifyOTPConfig {
  verifyOTP: (credentials: VerifyOTPCredentials) => Promise<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
  isSignUp?: boolean;
}

export function useVerifyOTP(config: UseVerifyOTPConfig) {
  const {
    verifyOTP,
    onSuccess,
    onError,
    successMessage,
    errorMessage = 'Code de vérification incorrect',
    isSignUp = false
  } = config;

  const defaultSuccessMessage = isSignUp 
    ? 'Compte créé avec succès !' 
    : 'Connexion réussie !';

  const mutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: (data) => {
      toast.success(successMessage || defaultSuccessMessage, {
        description: 'Bienvenue sur Arvox',
        duration: 5000
      });
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      const message = error.message.toLowerCase();
      
      if (message.includes('authentification') || 
          message.includes('otp') || 
          message.includes('code')) {
        toast.error('Code de vérification incorrect', {
          description: 'Veuillez vérifier le code et réessayer',
          duration: 5000
        });
      } else {
        toast.error(error.message || errorMessage, {
          description: 'Une erreur est survenue, veuillez réessayer',
          duration: 5000
        });
      }
      onError?.(error);
    }
  });

  return {
    verifyOTP: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset
  };
}
