import { useLocalStorage } from '../hooks/use-common';

export interface SavedSession {
  email: string;
  lastUsed: string;
  name?: string;
}

export function useSavedSessions() {
  const [savedSessions, setSavedSessions] = useLocalStorage<SavedSession[]>('arvox_saved_sessions', []);

  const saveSession = (email: string, name?: string) => {
    const sessions = Array.isArray(savedSessions) ? savedSessions : [];
    const existingIndex = sessions.findIndex(s => s.email === email);

    const newSession: SavedSession = {
      email,
      lastUsed: new Date().toISOString(),
      name: name || email.split('@')[0]
    };

    if (existingIndex >= 0) {
      sessions[existingIndex] = newSession;
    } else {
      sessions.unshift(newSession);
    }

    // Limiter à 5 sessions
    const limitedSessions = sessions.slice(0, 5);
    setSavedSessions(limitedSessions);
  };

  const removeSession = (email: string) => {
    const sessions = Array.isArray(savedSessions) ? savedSessions : [];
    const filteredSessions = sessions.filter(s => s.email !== email);
    setSavedSessions(filteredSessions);
  };

  const clearSessions = () => {
    setSavedSessions([]);
  };

  const getLastUsedSession = (): SavedSession | null => {
    const sessions = Array.isArray(savedSessions) ? savedSessions : [];
    return sessions[0] || null;
  };

  return {
    savedSessions: Array.isArray(savedSessions) ? savedSessions : [],
    saveSession,
    removeSession,
    clearSessions,
    getLastUsedSession
  };
}
