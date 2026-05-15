'use client';

import { getQueryClient } from '@/src/shared/lib/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  // const [queryClient] = useState(() => new QueryClient());

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
