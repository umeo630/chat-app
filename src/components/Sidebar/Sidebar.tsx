'use client'

import { Heading, VStack, Avatar, Box, Text, Flex } from '@chakra-ui/react'
import { get, getDatabase, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

export const Sidebar = () => {
  const [users, setUsers] = useState<
    { id: string; username: string; profileImage: string }[]
  >([])

  useEffect(() => {
    const db = getDatabase()
    const usersRef = ref(db, 'users')
    const snapshot = get(usersRef)
    snapshot.then((snapshot) => {
      const userData = snapshot.val()
      console.log(userData)

      const users = Object.keys(userData).map((key) => ({
        ...userData[key],
        id: key,
      }))
      setUsers(users)
    })
  }, [])

  return (
    <Box bg={'gray.100'} w={60} h={'90vh'}>
      <Heading size="md" textAlign={'center'} mb={4} mt={2}>
        Users
      </Heading>
      <VStack spacing={3} alignItems="start">
        {users.map((user) => (
          <Box
            as="a"
            href="#"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            w={'100%'}
            key={user.id}
          >
            <Flex
              key={1}
              align={'center'}
              p={2}
              mx={2}
              borderRadius={'md'}
              cursor={'pointer'}
              _hover={{ bg: 'blue.400', color: 'white' }}
            >
              <Avatar size="sm" />
              <Text ml={3}>{user.username}</Text>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}