import type { Metadata } from "next";
// Import Fonts
import { Inter, Poppins } from "next/font/google";
// Import Global.css
import '@/styles/global.css';

//Import Navbar and Footer Components for Default Layout
import {Navbar, Footer} from '@/components';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${inter.variable} ${poppins.variable}`} lang="en">
      <body>
        <div className="ApplicationWrapper">
          <Navbar />
          <main className="ApplicationContent">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
