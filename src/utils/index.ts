// Utilitaires pour le texte
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function formatDisplayName(firstName: string, lastName: string, maxLength: number): string {
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  return truncateText(fullName, maxLength);
}

// Utilitaires pour les styles - Re-export from style.ts
export { cn } from './style';

// Utilitaires pour les erreurs
export function handleApiError(error: unknown): string {
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message;
  }
  return 'Une erreur est survenue';
}

// Utilitaires pour les délais
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Re-export des utilitaires de query
export * from './query';

// Re-export des utilitaires de validation (inclut formatDate, formatCurrency, etc.)
export * from './validation';

// Re-export des utilitaires de dates (avec alias pour éviter conflit avec validation.formatDate)
export {
  formatDate as formatDateAdvanced,
  formatDateTime,
  formatRelativeTime,
  isToday,
  isYesterday,
  addDays,
  startOfDay,
  endOfDay
} from './date';

// Re-export des utilitaires d'URL
export * from './url';
