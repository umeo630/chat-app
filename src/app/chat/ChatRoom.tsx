'use client'

import {
  Heading,
  Spacer,
  Flex,
  chakra,
  Button,
  Container,
  Input,
  Text,
  Box,
} from '@chakra-ui/react'
import { getDatabase, ref, push, onChildAdded } from 'firebase/database'
import { useRef, useState, useEffect } from 'react'
import { Message } from './Message'
import { useUserContext } from '@/feature/user/provider/UserProvider'

export const ChatRoom = () => {
  const messageElementRef = useRef<HTMLDivElement | null>(null)
  const [message, setMessage] = useState<string>('')
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      await push(dbRef, {
        message,
      })
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  const [chats, setChats] = useState<{ message: string; createdAt: string }[]>(
    []
  )

  useEffect(() => {
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      return onChildAdded(dbRef, (snapshot) => {
        const message = String(snapshot.val()['message'] ?? '')
        setChats((prev) => [...prev, { message, createdAt: '2021-09-01' }])
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    messageElementRef.current?.scrollTo({
      top: messageElementRef.current.scrollHeight,
    })
  }, [chats])

  const { selectedUser } = useUserContext()

  return (
    <Box w={'100%'} h={'100%'}>
      <Flex
        py={3}
        pl={3}
        borderBottom="1px"
        borderBottomColor="gray.100"
        align={'center'}
      >
        <Text ml={2} fontSize={16} as="b">
          {selectedUser?.username}
        </Text>
      </Flex>
      <Container py={1} maxW={'100%'}>
        <Flex
          direction={'column'}
          gap={2}
          overflowY={'auto'}
          height={'550'}
          ref={messageElementRef}
        >
          {chats.map((chat, i) => (
            <Message
              key={i}
              username="user"
              message={chat.message}
              createdAt={chat.createdAt}
            />
          ))}
        </Flex>
        <Spacer height={2} aria-hidden />
        <chakra.form display={'flex'} gap={2} onSubmit={handleSendMessage}>
          <Input
            name="message"
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          />
          <Button type="submit">送信</Button>
        </chakra.form>
      </Container>
    </Box>
  )
}
