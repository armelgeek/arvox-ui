import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useBetterAuthSession } from './use-better-auth-session';
import type { 
  SignInCredentials, 
  SignUpCredentials, 
  OTPCredentials, 
  VerifyOTPCredentials,
  ResetPasswordCredentials,
  UpdatePasswordCredentials,
  AuthState
} from './types';

interface AuthUser {
  id: string;
  email: string;
  name?: string;
  emailVerified?: boolean;
  role?: string;
}

interface AuthSession {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
}

interface AuthClient {
  signIn: (credentials: SignInCredentials) => Promise<{ user: AuthUser; session: AuthSession }>;
  signUp: (credentials: SignUpCredentials) => Promise<{ user: AuthUser; session: AuthSession }>;
  signOut: () => Promise<void>;
  sendEmailOTP: (credentials: OTPCredentials) => Promise<void>;
  verifyEmailOTP: (credentials: VerifyOTPCredentials) => Promise<{ user: AuthUser; session: AuthSession }>;
  resetPassword: (credentials: ResetPasswordCredentials) => Promise<void>;
  updatePassword: (credentials: UpdatePasswordCredentials) => Promise<void>;
  getSession: () => Promise<AuthState>;
}

interface UseAuthConfig {
  authClient: AuthClient;
  onSuccess?: {
    signIn?: (data: { user: AuthUser; session: AuthSession }) => void;
    signUp?: (data: { user: AuthUser; session: AuthSession }) => void;
    signOut?: () => void;
  };
  onError?: {
    signIn?: (error: Error) => void;
    signUp?: (error: Error) => void;
    signOut?: (error: Error) => void;
  };
  redirects?: {
    afterSignIn?: string;
    afterSignUp?: string;
    afterSignOut?: string;
  };
}

export function useAuth(config: UseAuthConfig) {
  const queryClient = useQueryClient();
  const { authClient, onSuccess, onError } = config;

  // Utiliser Better Auth session directement
  const sessionState = useBetterAuthSession({
    getSession: authClient.getSession,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    onSessionChange: (session) => {
      // Optionnel: invalider les caches TanStack Query si nécessaire
      if (!session?.user) {
        queryClient.clear();
      }
    }
  });

  // Mutation de connexion
  const signInMutation = useMutation({
    mutationFn: (credentials: SignInCredentials) => authClient.signIn(credentials),
    onSuccess: (data) => {
      sessionState.refetch();
      toast.success('Connexion réussie');
      onSuccess?.signIn?.(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur de connexion');
      onError?.signIn?.(error);
    }
  });

  // Mutation d'inscription
  const signUpMutation = useMutation({
    mutationFn: (credentials: SignUpCredentials) => authClient.signUp(credentials),
    onSuccess: (data) => {
      sessionState.refetch();
      toast.success('Compte créé avec succès');
      onSuccess?.signUp?.(data);
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la création du compte');
      onError?.signUp?.(error);
    }
  });

  // Mutation de déconnexion
  const signOutMutation = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      sessionState.refetch();
      queryClient.clear();
      toast.success('Déconnexion réussie');
      onSuccess?.signOut?.();
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur de déconnexion');
      onError?.signOut?.(error);
    }
  });

  // Mutation pour envoyer OTP
  const sendOTPMutation = useMutation({
    mutationFn: (credentials: OTPCredentials) => authClient.sendEmailOTP(credentials),
    onSuccess: () => {
      toast.success('Code de vérification envoyé');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de l\'envoi du code');
    }
  });

  // Mutation pour vérifier OTP
  const verifyOTPMutation = useMutation({
    mutationFn: (credentials: VerifyOTPCredentials) => authClient.verifyEmailOTP(credentials),
    onSuccess: () => {
      sessionState.refetch();
      toast.success('Code vérifié avec succès');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Code de vérification incorrect');
    }
  });

  // Mutation pour reset password
  const resetPasswordMutation = useMutation({
    mutationFn: (credentials: ResetPasswordCredentials) => authClient.resetPassword(credentials),
    onSuccess: () => {
      toast.success('Instructions de réinitialisation envoyées');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la réinitialisation');
    }
  });

  // Mutation pour update password
  const updatePasswordMutation = useMutation({
    mutationFn: (credentials: UpdatePasswordCredentials) => authClient.updatePassword(credentials),
    onSuccess: () => {
      toast.success('Mot de passe mis à jour');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la mise à jour');
    }
  });

  return {
    // State
    user: sessionState.user,
    session: sessionState.session,
    isLoading: sessionState.isLoading,
    isAuthenticated: sessionState.isAuthenticated,

    // Actions
    signIn: signInMutation.mutate,
    signUp: signUpMutation.mutate,
    signOut: signOutMutation.mutate,
    sendOTP: sendOTPMutation.mutate,
    verifyOTP: verifyOTPMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    updatePassword: updatePasswordMutation.mutate,

    // Loading states
    isSigningIn: signInMutation.isPending,
    isSigningUp: signUpMutation.isPending,
    isSigningOut: signOutMutation.isPending,
    isSendingOTP: sendOTPMutation.isPending,
    isVerifyingOTP: verifyOTPMutation.isPending,
    isResettingPassword: resetPasswordMutation.isPending,
    isUpdatingPassword: updatePasswordMutation.isPending,

    // Utils
    refetchSession: sessionState.refetch,
    invalidateAuth: () => queryClient.invalidateQueries({ queryKey: ['auth'] })
  };
}
