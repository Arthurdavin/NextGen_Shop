
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ThemeProvider } from '@/contexts/Theme-provider'
import './globals.css'
import { Header } from '@/components/layout/Header';
import TestFooter from '@/components/layout/TestFooter';
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'NextGen Shop - Your Ultimate Online Store for Electronics and Gadgets',
  description: 'Discover amazing deals on electronics, gadgets, and more at Exclusive.',
  keywords: ["Next.js", "React", "JavaScript"],
  openGraph: {
    title: "NextGen shop",
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <Header/>
          {children}
          <TestFooter/>
        </ThemeProvider>
      </body>
    </html>
  )
}
