'use client'

import { useAuthContext } from '@/feature/auth/provider/AuthProvider'
import { Container, Heading, chakra } from '@chakra-ui/react'

export const Header = () => {
  const { user } = useAuthContext()
  return (
    <chakra.header py={4} bgColor={'blue.400'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>{user ? 'ログイン中' : '未ログイン'}</Heading>
      </Container>
    </chakra.header>
  )
}
