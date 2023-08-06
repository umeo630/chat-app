'use client'

import { useAuthContext } from '@/feature/auth/provider/AuthProvider'
import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Text,
  chakra,
  useToast,
} from '@chakra-ui/react'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const Header = () => {
  const { user } = useAuthContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'サインアウトしました',
        status: 'success',
        position: 'top',
      })
      push('/signin')
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <chakra.header py={4} bgColor={'blue.400'}>
      <Container
        maxW={'container.lg'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Heading color={'white'}>
          <Link href={'/'}>Home</Link>
        </Heading>
        <Box textAlign={'right'}>
          {user ? (
            <Button
              colorScheme={'teal'}
              onClick={handleSignOut}
              isLoading={isLoading}
            >
              サインアウト
            </Button>
          ) : (
            <Text color={'white'}>未ログイン</Text>
          )}
        </Box>
      </Container>
    </chakra.header>
  )
}
