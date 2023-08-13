'use client'

import { chakra, Flex, Spacer, Heading, Container } from '@chakra-ui/react'
import Link from 'next/link'

export const Footer = () => {
  return (
    <chakra.footer py={4} bgColor={'blue.400'} color={'white'}>
      <Container maxW={'container.lg'}>
        <Flex flexDirection={'column'} gap={2} alignItems={'start'}>
          <Link href={'/'}>トップページ</Link>
          <Link href={'/signin'}>サインイン</Link>
          <Link href={'/signup'}>サインアップ</Link>
          <Link href={'/chat'}>チャット</Link>
        </Flex>
      </Container>
    </chakra.footer>
  )
}
