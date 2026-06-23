'use client';

import { Button } from '@/src/shared/ui/button';
import { useEffect } from 'react';

type ErrorPageProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

const ErrorPage = ({ error, unstable_retry }: ErrorPageProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">
        The page crashed unexpectedly. Please try again.
      </p>

      <Button type="button" onClick={unstable_retry}>
        Try again
      </Button>
    </main>
  );
};

export default ErrorPage;
