// Re-export auth config function
export { createArvoxAuthConfig } from './types';

// Re-export all auth hooks
export { useAuth } from './use-auth';
export { useOTPAuth } from './use-otp';
export { useVerifyOTP } from './use-verify-otp';
export { useCheckEmail } from './use-check-email';
export { useSavedSessions } from './use-saved-sessions';
export { useBetterAuthSession, useIsAuthenticated, useCurrentUser } from './use-better-auth-session';

// Hooks pour la gestion du compte
export { useForgotPassword, useResetPassword } from './use-password-reset';
export { useChangePassword, useUpdateProfile, useProfile, type BetterAuthClient } from './use-account-management';
export { useEmailVerification } from './use-email-verification';
export { useTwoFactorAuth } from './use-two-factor';
export { useRememberMe } from './use-remember-me';
export { useDeleteAccount } from './use-delete-account';

// Re-export all auth schemas
export {
  signInSchema,
  signUpSchema,
  otpLoginSchema,
  verifyOtpSchema,
  resetPasswordSchema,
  updatePasswordSchema
} from './schemas';

// Re-export all auth types
export type {
  BetterAuthConfig,
  User,
  Session,
  AuthState,
  SignInCredentials,
  SignUpCredentials,
  OTPCredentials,
  VerifyOTPCredentials,
  ResetPasswordCredentials,
  UpdatePasswordCredentials
} from './types';

export type {
  SignInFormData,
  SignUpFormData,
  OTPLoginFormData,
  VerifyOTPFormData,
  ResetPasswordFormData,
  UpdatePasswordFormData
} from './schemas';

export type { SavedSession } from './use-saved-sessions';
