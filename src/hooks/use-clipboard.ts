import { useState, useCallback } from 'react';
import { toast } from 'sonner';

interface UseCopyToClipboardReturn {
  copy: (text: string) => Promise<boolean>;
  copied: boolean;
  reset: () => void;
}

export function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copié dans le presse-papiers');
      
      // Reset after 3 seconds
      setTimeout(() => setCopied(false), 3000);
      
      return true;
    } catch (error) {
      console.error('Failed to copy text: ', error);
      toast.error('Erreur lors de la copie');
      setCopied(false);
      return false;
    }
  }, []);

  const reset = useCallback(() => {
    setCopied(false);
  }, []);

  return { copy, copied, reset };
}
