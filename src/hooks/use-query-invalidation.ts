import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

interface QueryInvalidationOptions {
  exact?: boolean;
  refetchType?: 'all' | 'active' | 'inactive';
}

export function useQueryInvalidation() {
  const queryClient = useQueryClient();

  const invalidateQuery = useCallback(
    (queryKey: string[], options: QueryInvalidationOptions = {}) => {
      return queryClient.invalidateQueries({
        queryKey,
        exact: options.exact,
        refetchType: options.refetchType || 'all'
      });
    },
    [queryClient]
  );

  const invalidateMultiple = useCallback(
    (queryKeys: string[][], options: QueryInvalidationOptions = {}) => {
      return Promise.all(
        queryKeys.map(queryKey =>
          queryClient.invalidateQueries({
            queryKey,
            exact: options.exact,
            refetchType: options.refetchType || 'all'
          })
        )
      );
    },
    [queryClient]
  );

  const refetchQuery = useCallback(
    (queryKey: string[]) => {
      return queryClient.refetchQueries({ queryKey });
    },
    [queryClient]
  );

  const setQueryData = useCallback(
    <T>(queryKey: string[], data: T) => {
      queryClient.setQueryData(queryKey, data);
    },
    [queryClient]
  );

  const removeQuery = useCallback(
    (queryKey: string[]) => {
      queryClient.removeQueries({ queryKey });
    },
    [queryClient]
  );

  const clearAll = useCallback(() => {
    queryClient.clear();
  }, [queryClient]);

  return {
    invalidateQuery,
    invalidateMultiple,
    refetchQuery,
    setQueryData,
    removeQuery,
    clearAll
  };
}
