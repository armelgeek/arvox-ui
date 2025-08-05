import { useState, useEffect, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AuthClient {
  enableTwoFactor: () => Promise<{ qrCode: string; secret: string }>;
  disableTwoFactor: (data: { password: string }) => Promise<void>;
  verifyTwoFactor: (data: { code: string }) => Promise<boolean>;
  getTwoFactorStatus: () => Promise<{ enabled: boolean }>;
}

interface UseTwoFactorAuthConfig {
  authClient: AuthClient;
  onStatusChange?: (enabled: boolean) => void;
}

export function useTwoFactorAuth(config: UseTwoFactorAuthConfig) {
  const { authClient, onStatusChange } = config;

  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>('');

  // Charger le statut initial
  useEffect(() => {
    const loadStatus = async () => {
      try {
        const status = await authClient.getTwoFactorStatus();
        setIsEnabled(status.enabled);
      } catch (error) {
        console.error('Erreur lors du chargement du statut 2FA:', error);
      }
    };

    loadStatus();
  }, [authClient]);

  const enableMutation = useMutation({
    mutationFn: () => authClient.enableTwoFactor(),
    onSuccess: (data) => {
      setIsEnabled(true);
      setQrCode(data.qrCode);
      toast.success('Authentification à deux facteurs activée');
      onStatusChange?.(true);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de l\'activation 2FA');
    }
  });

  const disableMutation = useMutation({
    mutationFn: (password: string) => authClient.disableTwoFactor({ password }),
    onSuccess: () => {
      setIsEnabled(false);
      setQrCode('');
      toast.success('Authentification à deux facteurs désactivée');
      onStatusChange?.(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la désactivation 2FA');
    }
  });

  const verifyMutation = useMutation({
    mutationFn: (code: string) => authClient.verifyTwoFactor({ code }),
    onSuccess: (isValid) => {
      if (isValid) {
        toast.success('Code 2FA valide');
      } else {
        toast.error('Code 2FA invalide');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la vérification 2FA');
    }
  });

  const refreshStatus = useCallback(async () => {
    try {
      const status = await authClient.getTwoFactorStatus();
      setIsEnabled(status.enabled);
    } catch (error) {
      console.error('Erreur lors du rafraîchissement du statut 2FA:', error);
    }
  }, [authClient]);

  return {
    // État
    isEnabled,
    qrCode,

    // Actions
    enable: enableMutation.mutate,
    disable: disableMutation.mutate,
    verify: verifyMutation.mutate,
    refreshStatus,

    // États de chargement
    isEnabling: enableMutation.isPending,
    isDisabling: disableMutation.isPending,
    isVerifying: verifyMutation.isPending,

    // Erreurs
    enableError: enableMutation.error,
    disableError: disableMutation.error,
    verifyError: verifyMutation.error,

    // Succès
    enableSuccess: enableMutation.isSuccess,
    disableSuccess: disableMutation.isSuccess,
    verifyResult: verifyMutation.data
  };
}
