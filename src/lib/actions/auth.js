'use server';

import { signIn, signOut } from '@/auth';
import { LOGIN_USER, SYNC_USER_MUTATION } from '../mutations';
import { getClient } from '../ApolloClient';

export const login = async (providerName) => {
  await signIn(providerName, { redirectTo: '/' });
};

export const logout = async () => {
  await signOut({ redirectTo: '/' });
};

// Function to sync user with backend
export const syncUserWithBackend = async (idToken) => {
  const client = getClient();

  if (!idToken) {
    throw new Error('ID token is required for backend sync');
  }

  try {
    const { data, errors } = await client.mutate({
      mutation: SYNC_USER_MUTATION,
      variables: { googleToken: idToken },
    });

    if (errors && errors.length > 0) {
      console.error('GraphQL errors:', errors);
      throw new Error(
        errors[0]?.message || 'Failed to sync user with the server',
      );
    }

    const userData = {
      token: data.googleAuth.token,
      provider: data.googleAuth.provider,
      userId: data.googleAuth.id,
    };

    return userData;
  } catch (error) {
    console.error('Error syncing user with the server:', error);
    throw error;
  }
};

// Function to refresh the access token
export const refreshAccessToken = async (token) => {
  try {
    const url = 'https://oauth2.googleapis.com/token';

    const response = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.AUTH_GOOGLE_ID,
        client_secret: process.env.AUTH_GOOGLE_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
      }),
    });

    const tokensOrError = await response.json();

    if (!response.ok) throw tokensOrError;

    const newTokens = tokensOrError;

    return {
      ...token,
      access_token: newTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + newTokens.expires_in),
      refresh_token: newTokens.refresh_token ?? token.refresh_token,
    };
  } catch (error) {
    console.error('Error refreshing access token', error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const getUserFromDb = async (email, password) => {
  const client = getClient();

  try {
    const { data, errors } = await client.mutate({
      mutation: LOGIN_USER,
      variables: { email, password },
    });

    if (errors && errors.length > 0) {
      console.error('GraphQL errors:', errors);
      throw new Error(errors[0]?.message || 'GraphQL error occurred');
    }

    const user = data?.loginWithEmail;

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      provider: user.provider,
      hasPassword: user.hasPassword,
      token: user.token,
    };
  } catch (error) {
    console.error('Error in getUserFromDb:', error);
    throw error;
  }
};
