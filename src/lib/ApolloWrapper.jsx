'use client';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Spin } from 'antd';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

export const ApolloWrapper = ({ children }) => {
  const { data: session, status } = useSession();

  const client = useMemo(() => {
    const httpLink = createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}/graphql`,
    });

    const authLink = setContext((_, { headers }) => {
      const token = session?.token;

      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    });

    const link = authLink.concat(httpLink);

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  }, [session?.token]); // Recreate client when token changes

  // Show loading state while session is being fetched
  if (status === 'loading') {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spin size="default">
          <div className="h-0 w-0" />
        </Spin>
      </div>
    );
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
