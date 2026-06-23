import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-muted-foreground">
        The requested page could not be found.
      </p>

      <Link
        href="/calendar"
        className="inline-flex items-center justify-center gap-1 text-sm text-sky-500 underline"
      >
        <ArrowLeft size={16} />
        <span>Back to calendar</span>
      </Link>
    </main>
  );
};

export default NotFound;
