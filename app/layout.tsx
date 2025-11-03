import { type Metadata } from 'next'
import {
  ClerkProvider
} from '@clerk/nextjs'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import  { Toaster } from 'sonner'
import { ThemeProvider } from './providers'

export const metadata: Metadata = {
  title: 'Roadmapper AI',
  description: 'AI-generated skill roadmaps to help you learn anything faster',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
        <Toaster position="top-center" />
      </body>
    </html>
    </ClerkProvider>
  )
}