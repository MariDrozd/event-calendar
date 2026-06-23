'use client';

import { useEffect } from 'react';

type GlobalErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

const GlobalError = ({ error, unstable_retry }: GlobalErrorProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <main>
          <h1>Application error</h1>
          <p>Something went wrong while loading the application.</p>
          <button type="button" onClick={unstable_retry}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
