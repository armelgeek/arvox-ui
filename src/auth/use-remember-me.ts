import { useState, useEffect, useCallback } from 'react';

interface RememberMeState {
  isEnabled: boolean;
  savedCredentials: {
    email?: string;
    rememberMe?: boolean;
  } | null;
}

interface UseRememberMeConfig {
  storageKey?: string;
  encryptCredentials?: boolean;
}

export function useRememberMe(config: UseRememberMeConfig = {}) {
  const { storageKey = 'arvox-remember-me' } = config;
  
  const [state, setState] = useState<RememberMeState>({
    isEnabled: false,
    savedCredentials: null
  });

  // Charger les données sauvegardées au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({
          isEnabled: parsed.rememberMe || false,
          savedCredentials: parsed
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données Remember Me:', error);
    }
  }, [storageKey]);

  const saveCredentials = useCallback((email: string, rememberMe: boolean) => {
    try {
      if (rememberMe) {
        const credentials = {
          email,
          rememberMe: true,
          savedAt: new Date().toISOString()
        };
        
        localStorage.setItem(storageKey, JSON.stringify(credentials));
        setState({
          isEnabled: true,
          savedCredentials: credentials
        });
      } else {
        localStorage.removeItem(storageKey);
        setState({
          isEnabled: false,
          savedCredentials: null
        });
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde Remember Me:', error);
    }
  }, [storageKey]);

  const clearCredentials = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      setState({
        isEnabled: false,
        savedCredentials: null
      });
    } catch (error) {
      console.error('Erreur lors de la suppression Remember Me:', error);
    }
  }, [storageKey]);

  const getSavedEmail = useCallback(() => {
    return state.savedCredentials?.email || '';
  }, [state.savedCredentials]);

  return {
    isEnabled: state.isEnabled,
    savedEmail: getSavedEmail(),
    saveCredentials,
    clearCredentials,
    hasSavedCredentials: !!state.savedCredentials
  };
}
