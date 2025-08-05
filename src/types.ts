// Types communs pour les entités
export interface HasId {
  id: string;
}

// Types pour la pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Types pour les filtres
export interface FilterParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Types pour les réponses API
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// Types pour les query keys
export interface QueryKeys {
  all: string[];
  lists: () => string[];
  list: (params: Record<string, unknown>) => string[];
  details: () => string[];
  detail: (id: string) => string[];
}

// Types pour les services
export interface BaseService<T, P> {
  list: (params?: PaginationParams & FilterParams) => Promise<PaginatedResponse<T>>;
  get: (id: string) => Promise<T>;
  create: (payload: P) => Promise<T>;
  update: (id: string, payload: Partial<P>) => Promise<T>;
  delete: (id: string) => Promise<void>;
}
