import type { Metadata } from 'next';
// Import Fonts
import { Inter, Poppins } from 'next/font/google';
// Import Global.css
import './globals.css';


//Import Navbar and Footer Components for Default Layout
import { Navbar, Footer } from '@/components/layout';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: 'Walkly',
  description: 'Coming Soon',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <html className={`${inter.variable} ${poppins.variable}`} lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <div className='flex flex-col min-h-screen'>
          <Navbar />
          <main className='flex flex-1'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
