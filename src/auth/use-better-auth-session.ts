import { useState, useEffect, useCallback } from 'react';
import type { AuthState } from './types';

interface UseBetterAuthSessionConfig {
  getSession: () => Promise<AuthState>;
  enabled?: boolean;
  refetchInterval?: number;
  onSessionChange?: (session: AuthState | null) => void;
}

export function useBetterAuthSession(config: UseBetterAuthSessionConfig) {
  const { getSession, enabled = true, refetchInterval, onSessionChange } = config;
  
  const [state, setState] = useState<{
    data: AuthState | null;
    isLoading: boolean;
    error: Error | null;
    isRefetching: boolean;
  }>({
    data: null,
    isLoading: enabled,
    error: null,
    isRefetching: false
  });

  const fetchSession = useCallback(async (isRefetch = false) => {
    if (!enabled) return;

    setState(prev => ({ 
      ...prev, 
      isLoading: !isRefetch, 
      isRefetching: isRefetch,
      error: null 
    }));

    try {
      const sessionData = await getSession();
      setState(prev => ({ 
        ...prev, 
        data: sessionData, 
        isLoading: false, 
        isRefetching: false,
        error: null 
      }));
      onSessionChange?.(sessionData);
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Session fetch failed');
      setState(prev => ({ 
        ...prev, 
        data: null, 
        isLoading: false, 
        isRefetching: false,
        error: errorObj 
      }));
      onSessionChange?.(null);
    }
  }, [getSession, enabled, onSessionChange]);

  const refetch = useCallback(() => {
    return fetchSession(true);
  }, [fetchSession]);

  // Initial fetch
  useEffect(() => {
    if (enabled) {
      fetchSession();
    }
  }, [fetchSession, enabled]);

  // Auto refetch interval
  useEffect(() => {
    if (!enabled || !refetchInterval) return;

    const interval = setInterval(() => {
      fetchSession(true);
    }, refetchInterval);

    return () => clearInterval(interval);
  }, [fetchSession, enabled, refetchInterval]);

  // Window focus refetch
  useEffect(() => {
    if (!enabled) return;

    const handleFocus = () => {
      fetchSession(true);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [fetchSession, enabled]);

  return {
    data: state.data,
    user: state.data?.user || null,
    session: state.data?.session || null,
    isLoading: state.isLoading,
    isAuthenticated: !!state.data?.user,
    error: state.error,
    refetch,
    isRefetching: state.isRefetching
  };
}

// Hook spécialisé pour vérifier si l'utilisateur est authentifié
export function useIsAuthenticated(config: UseBetterAuthSessionConfig) {
  const session = useBetterAuthSession(config);
  
  return {
    isAuthenticated: session.isAuthenticated,
    isLoading: session.isLoading,
    user: session.user
  };
}

// Hook pour récupérer seulement l'utilisateur courant
export function useCurrentUser(config: UseBetterAuthSessionConfig) {
  const session = useBetterAuthSession(config);
  
  return {
    user: session.user,
    isLoading: session.isLoading,
    error: session.error,
    refetch: session.refetch
  };
}
