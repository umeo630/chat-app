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
  Text,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { getAuth, signOut } from 'firebase/auth'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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

  const [username, setUsername] = useState<string>('')
  const [profileImageUrl, setProfileImageUrl] = useState<string>('')

  useEffect(() => {
    if (user) {
      const db = getDatabase()
      const userRef = ref(db, `users/${user.uid}`)
      const unsubscribe = onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
          setUsername(snapshot.val()['username'])
          setProfileImageUrl(snapshot.val()['profileImageUrl'])
        }
      })

      return () => unsubscribe()
    }
  }, [user])

  return (
    <chakra.header py={4} bgColor={'blue.400'}>
      <Container maxW={'container.lg'}>
        <Flex alignItems={'center'}>
          <Link href={'/'}>
            <Heading color={'white'}>Chat</Heading>
          </Link>
          <Spacer aria-hidden />
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  src={profileImageUrl || undefined}
                  flexShrink={0}
                  width={10}
                  height={10}
                />
              </MenuButton>
              <MenuList py={0}>
                <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
              </MenuList>
              {username && (
                <Text ml={2} color={'white'}>
                  {username}
                </Text>
              )}
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
