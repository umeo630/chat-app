'use client' // クライアントサイドコンポーネントに変換

import { Box, Heading, Link } from '@chakra-ui/react'
export default function Page() {
  return (
    <Box>
      <Heading>Home</Heading>
      <Box>
        <Link href="/signup">Sign Up</Link>
      </Box>
      <Box>
        <Link href="/signin">Sign In</Link>
      </Box>
    </Box>
  )
}
