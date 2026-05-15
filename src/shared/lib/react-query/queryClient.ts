import { QueryClient } from '@tanstack/react-query';

let browserQueryClient: QueryClient | undefined;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
      },
    },
  });
};

export const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return makeQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
};
