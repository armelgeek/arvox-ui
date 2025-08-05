import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface UseApiMutationConfig<TData, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}

export function useApiMutation<TData = unknown, TVariables = unknown>(
  config: UseApiMutationConfig<TData, TVariables>
) {
  const {
    mutationFn,
    onSuccess,
    onError,
    successMessage,
    errorMessage,
    showToast = true
  } = config;

  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      if (showToast && successMessage) {
        toast.success(successMessage);
      }
      onSuccess?.(data, variables);
    },
    onError: (error: Error, variables) => {
      if (showToast) {
        const message = errorMessage || error.message || 'Une erreur est survenue';
        toast.error(message);
      }
      onError?.(error, variables);
    }
  });
}

interface UseOptimisticMutationConfig<TData, TVariables> extends UseApiMutationConfig<TData, TVariables> {
  queryKey: string[];
  updater: (oldData: TData | undefined, variables: TVariables) => TData;
}

export function useOptimisticMutation<TData = unknown, TVariables = unknown>(
  config: UseOptimisticMutationConfig<TData, TVariables>
) {
  // This would require QueryClient context and optimistic updates
  // Simplified version that just uses the base mutation
  return useApiMutation(config);
}
