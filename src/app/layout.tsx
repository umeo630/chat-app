import { AuthProvider } from '@/feature/auth/provider/AuthProvider'
import { Providers } from './providers'
import { Header } from '@/components/Header/Header'

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
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
