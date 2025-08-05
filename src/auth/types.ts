// Types pour Better Auth
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  [key: string]: unknown; // Pour les champs additionnels
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  user: User;
}

export interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface OTPCredentials {
  email: string;
}

export interface VerifyOTPCredentials {
  email: string;
  otp: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface UpdatePasswordCredentials {
  currentPassword?: string;
  newPassword: string;
  token?: string; // Pour reset password
}

// Configuration simplifiée pour éviter les problèmes de types Better Auth
export interface BetterAuthConfig {
  baseURL: string;
  plugins?: unknown[];
}

// Fonction utilitaire simplifiée
export function createArvoxAuthConfig(config: BetterAuthConfig) {
  return {
    baseURL: config.baseURL,
    plugins: config.plugins || []
  };
}
