import type { Metadata } from "next";
// Import Fonts
import { Inter, Poppins } from "next/font/google";
// Import Global.css
import '@/styles/global.css';

// Import Main Css Module
import styles from './Main.module.css';
import clsx from "clsx";

//Import Navbar and Footer Components for Default Layout
import {Navbar, Footer} from '@/components';
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Walkly",
  description: "Coming Soon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  return (
    <html className={`${inter.variable} ${poppins.variable}`} lang="en">
      <body>
        <div className={clsx(styles['ApplicationWrapper'])}>
          <Navbar />
          <main className={clsx(styles['ApplicationContent'])}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
