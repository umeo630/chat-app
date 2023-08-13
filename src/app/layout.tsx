'use client'

import { AuthProvider } from '@/feature/auth/provider/AuthProvider'
import { Providers } from './providers'
import { Header } from '@/components/Header/Header'
import { Footer } from '@/components/Footer/Footer'
import { Box } from '@chakra-ui/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <Header />
            <Box minHeight={'90vh'}>{children}</Box>
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
