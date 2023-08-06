'use client' // クライアントサイドコンポーネントに変換

import { AuthGuard } from '@/feature/auth/component/AuthGuard'
import { Box, Heading, Link } from '@chakra-ui/react'
export default function Page() {
  return (
    <AuthGuard>
      <Heading>Home</Heading>
      <Box>
        <Link href="/signup">Sign Up</Link>
      </Box>
      <Box>
        <Link href="/signin">Sign In</Link>
      </Box>
    </AuthGuard>
  )
}
