// Utilitaire pour créer des query keys typées
export function createQueryKeys(entityName: string) {
  return {
    all: [entityName] as const,
    lists: () => [entityName, 'list'] as const,
    list: (filters: Record<string, unknown>) => [entityName, 'list', filters] as const,
    details: () => [entityName, 'detail'] as const,
    detail: (id: string) => [entityName, 'detail', id] as const,
  };
}

// Utilitaire pour créer des filtres de query
export function createQueryFilter<T extends Record<string, unknown>>(filters: T) {
  const searchParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach(v => searchParams.append(key, String(v)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  return searchParams.toString();
}

// Utilitaire pour parser les paramètres de pagination
export interface QueryPaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
}

export function parsePaginationParams(searchParams: URLSearchParams): QueryPaginationParams {
  return {
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 10,
    sort: searchParams.get('sort') || undefined,
    order: (searchParams.get('order') as 'asc' | 'desc') || 'asc'
  };
}

// Utilitaire pour créer des options de query standardisées
export interface StandardQueryOptions {
  enabled?: boolean;
  staleTime?: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
}

export function createStandardQueryOptions(options: StandardQueryOptions = {}) {
  return {
    enabled: options.enabled ?? true,
    staleTime: options.staleTime ?? 0,
    refetchOnMount: options.refetchOnMount ?? true,
    refetchOnWindowFocus: options.refetchOnWindowFocus ?? true,
    retry: options.retry ?? 3
  };
}
