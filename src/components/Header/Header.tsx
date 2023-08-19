'use client'

import { useAuthContext } from '@/feature/auth/provider/AuthProvider'
import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

export const Header = () => {
  const { user } = useAuthContext()
  const toast = useToast()
  const { push } = useRouter()

  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'サインアウトしました',
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      push('/signin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <chakra.header py={4} bgColor={'blue.400'}>
      <Container maxW={'container.lg'}>
        <Flex>
          <Link href={'/'}>
            <Heading color={'white'}>Chat</Heading>
          </Link>
          <Spacer aria-hidden />
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar flexShrink={0} width={10} height={10} />
              </MenuButton>
              <MenuList py={0}>
                <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Flex gap={2}>
              <Link href={'/signin'}>
                <Button colorScheme={'teal'}>サインイン</Button>
              </Link>
              <Link href={'/signup'}>
                <Button colorScheme={'teal'}>サインアップ</Button>
              </Link>
            </Flex>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}
