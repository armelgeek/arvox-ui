import { useQuery, useQueryClient } from '@tanstack/react-query';

interface UseDataQueryConfig<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
  enabled?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
}

export function useDataQuery<T>(config: UseDataQueryConfig<T>) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: config.queryKey,
    queryFn: config.queryFn,
    enabled: config.enabled ?? true,
    staleTime: config.staleTime ?? 0,
    refetchOnMount: config.refetchOnMount ?? true,
    refetchOnWindowFocus: config.refetchOnWindowFocus ?? true,
    retry: config.retry ?? 3
  });

  const invalidate = () => {
    return queryClient.invalidateQueries({
      queryKey: config.queryKey,
      refetchType: 'all'
    });
  };

  const refetch = () => {
    return queryClient.refetchQueries({
      queryKey: config.queryKey
    });
  };

  const setData = (data: T) => {
    queryClient.setQueryData(config.queryKey, data);
  };

  return {
    ...query,
    invalidate,
    refetch,
    setData
  };
}
