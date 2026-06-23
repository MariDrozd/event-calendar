import { Header } from '@/src/widgets/header';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/src/shared/ui/toaster';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen bg-slate-50 p-8 pt-18 text-slate-900">
            {children}
            <Toaster />
          </main>
        </Providers>
      </body>
    </html>
  );
}
