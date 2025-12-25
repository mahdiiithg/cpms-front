import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import {
  getUserFromDb,
  refreshAccessToken,
  syncUserWithBackend,
} from '@/lib/actions/auth';

// Constants
const PROVIDER_TYPES = {
  CREDENTIALS: 'credentials',
  GOOGLE: 'google',
};
// ok
const TOKEN_EXPIRY_BUFFER = 60 * 1000; // 1 minute buffer before expiry

// Helper functions
const isTokenExpired = (expiresAt) => {
  if (!expiresAt) return true;
  return Date.now() >= expiresAt * 1000 - TOKEN_EXPIRY_BUFFER;
};

const handleCredentialsAuth = (user, token) => {
  token.token = user.token;
  token.backendSynced = true;
  token.hasPassword = user.hasPassword;
  // Ensure we carry userId/provider for downstream usage (bookings, wishlist)
  token.userId = user.id;
  token.provider = PROVIDER_TYPES.CREDENTIALS;
  return token;
};

const handleOAuthAuth = async (account, token) => {
  if (!account.id_token) {
    console.warn(`No id_token available for ${account.provider} provider`);
    token.backendSynced = false;
    token.syncError = 'No id_token available';
    return token;
  }

  try {
    const userData = await syncUserWithBackend(account.id_token);

    token.token = userData.token;
    token.provider = userData.provider;
    token.userId = userData.userId;
    token.backendSynced = true;
    console.log(`Successfully synced ${account.provider} user with backend`);
  } catch (error) {
    console.error(
      `Failed to sync ${account.provider} user with backend:`,
      error,
    );
    token.backendSynced = false;
    token.syncError = error.message || 'Backend sync failed';
  }

  return token;
};

const setInitialTokenData = (token, user, account) => {
  token.id = user.id;
  token.access_token = account.access_token;
  token.id_token = account.id_token;
  token.refresh_token = account.refresh_token;
  token.expires_at = account.expires_at;
  token.provider = account.provider;
  return token;
};

// Provider configurations
const credentialsProvider = Credentials({
  name: 'credentials',
  credentials: {
    email: {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    password: {
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  },
  authorize: async (credentials) => {
    if (!credentials?.email || !credentials?.password) {
      console.warn('Missing email or password in credentials');
      return null;
    }

    try {
      const user = await getUserFromDb(credentials.email, credentials.password);
      if (user) {
        console.log(`User authenticated successfully: ${user.email}`);
      }
      return user;
    } catch (error) {
      console.error('Credentials authentication failed:', error);
      return null;
    }
  },
});

const googleProvider = Google({
  authorization: {
    params: {
      access_type: 'offline',
      prompt: 'consent',
    },
  },
});

const providers = [credentialsProvider, googleProvider];

// Provider map for UI components
export const providerMap = providers
  .map((provider) => {
    const providerData = typeof provider === 'function' ? provider() : provider;
    return {
      id: providerData.id,
      name: providerData.name,
    };
  })
  .filter((provider) => provider.id !== PROVIDER_TYPES.CREDENTIALS);

// NextAuth configuration
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      // Handle initial sign in
      if (account && user) {
        console.log(
          `Processing ${account.provider} authentication for user: ${user.email}`,
        );

        // Set common token properties
        token = setInitialTokenData(token, user, account);

        // Handle provider-specific authentication
        if (account.provider === PROVIDER_TYPES.CREDENTIALS) {
          token = handleCredentialsAuth(user, token);
        } else {
          token = await handleOAuthAuth(account, token);
        }

        return token;
      }

      // Handle token refresh/update scenarios
      if (trigger === 'update') {
        console.log('Token update triggered');
        return token;
      }

      // Skip token refresh for credentials provider
      if (token.provider === PROVIDER_TYPES.CREDENTIALS) {
        return token;
      }

      // Check if token needs refreshing
      if (!isTokenExpired(token.expires_at)) {
        return token;
      }

      // Refresh expired OAuth tokens
      console.log('Refreshing expired OAuth token');

      try {
        const refreshedToken = await refreshAccessToken(token);
        if (refreshedToken.error) {
          console.error('Token refresh failed:', refreshedToken.error);
        }
        return refreshedToken;
      } catch (error) {
        console.error('Token refresh error:', error);
        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },

  async session({ session, token }) {
      // Populate session with token data
      const sessionData = {
        ...session,
        id_token: token.id_token,
        token: token.token,
        provider: token.provider,
        // Ensure a unified userId is present for both providers
        userId: token.userId || token.id,
        user: {
          ...session.user,
          id: token.id,
        },
      };

      // Add error information if present
      if (token.error) {
        sessionData.error = token.error;
      }

      if (token.syncError) {
        sessionData.syncError = token.syncError;
      }

      // Add sync status for debugging
      if (process.env.NODE_ENV === 'development') {
        sessionData.backendSynced = token.backendSynced;
      }

      return sessionData;
    },

    async signIn({ user, account, profile }) {
      // Additional sign-in validation can be added here
      if (account?.provider === PROVIDER_TYPES.GOOGLE) {
        // Validate Google profile if needed
        if (!profile?.email_verified) {
          console.warn('Google email not verified');
          return false;
        }
      }

      return true;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log(`User signed in: ${user.email} via ${account.provider}`);
    },
    async signOut({ token }) {
      console.log(`User signed out: ${token.email || 'Unknown'}`);
    },
    async session({ session, token }) {
      // Track session usage if needed
      if (process.env.NODE_ENV === 'development') {
        console.log(`Session accessed for user: ${session.user?.email}`);
      }
    },
  },
});
