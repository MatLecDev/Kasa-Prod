import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "../styles/globals.css";
import Header from "@/ui/Header/header";
import Footer from "@/ui/Footer/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kasa",
  description: "Chez vous, partout et ailleurs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
