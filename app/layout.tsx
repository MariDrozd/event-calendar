import { Header } from '@/src/widgets/header';
import './globals.css';
import { Providers } from './providers';

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
          <div className='pt-18 p-8'>
          {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
