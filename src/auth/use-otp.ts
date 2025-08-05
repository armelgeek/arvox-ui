import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { OTPCredentials } from './types';

interface UseOTPAuthConfig {
  sendOTP: (credentials: OTPCredentials) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useOTPAuth(config: UseOTPAuthConfig) {
  const {
    sendOTP,
    onSuccess,
    onError,
    successMessage = 'Code de vérification envoyé',
    errorMessage = 'Erreur lors de l\'envoi du code'
  } = config;

  const mutation = useMutation({
    mutationFn: sendOTP,
    onSuccess: () => {
      toast.success(successMessage);
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || errorMessage);
      onError?.(error);
    }
  });

  return {
    sendOTP: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset
  };
}
