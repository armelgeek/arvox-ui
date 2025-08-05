import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseCheckEmailConfig {
  checkEmail: (email: string) => Promise<{ exists: boolean; isRegistered: boolean }>;
  onSuccess?: (result: { exists: boolean; isRegistered: boolean }, email: string) => void;
  onError?: (error: Error, email: string) => void;
}

export function useCheckEmail(config: UseCheckEmailConfig) {
  const { checkEmail, onSuccess, onError } = config;

  const mutation = useMutation({
    mutationFn: ({ email }: { email: string }) => checkEmail(email),
    onSuccess: (data, variables) => {
      onSuccess?.(data, variables.email);
    },
    onError: (error: Error, variables) => {
      toast.error('Erreur lors de la vérification de l\'email');
      onError?.(error, variables.email);
    }
  });

  const checkEmailExists = (email: string) => {
    mutation.mutate({ email });
  };

  const clearCache = () => {
    mutation.reset();
  };

  return {
    checkEmail: checkEmailExists,
    isLoading: mutation.isPending,
    error: mutation.error,
    isError: mutation.isError,
    data: mutation.data,
    clearCache
  };
}
