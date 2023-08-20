'use client'

import { Sidebar } from '@/components/Sidebar/Sidebar'
import { AuthGuard } from '@/feature/auth/component/AuthGuard'
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  Spacer,
  Text,
  chakra,
} from '@chakra-ui/react'
import { getDatabase, onChildAdded, push, ref } from 'firebase/database'
import { useEffect, useRef, useState } from 'react'

type MessageProps = {
  message: string
}

const Message = ({ message }: MessageProps) => {
  return (
    <Flex alignItems={'start'}>
      <Avatar />
      <Box ml={2}>
        <Text bgColor={'gray.200'} rounded={'md'} px={2} py={1}>
          {message}
        </Text>
      </Box>
    </Flex>
  )
}

export default function Page() {
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

  const [chats, setChats] = useState<{ message: string }[]>([])

  useEffect(() => {
    try {
      const db = getDatabase()
      const dbRef = ref(db, 'chat')
      return onChildAdded(dbRef, (snapshot) => {
        const message = String(snapshot.val()['message'] ?? '')
        setChats((prev) => [...prev, { message }])
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

  return (
    <AuthGuard>
      <Flex>
        <Sidebar />
        <Container py={14}>
          <Heading>チャット</Heading>
          <Spacer height={8} aria-hidden />
          <Flex
            direction={'column'}
            gap={2}
            overflowY={'auto'}
            height={'500'}
            ref={messageElementRef}
          >
            {chats.map((chat, i) => (
              <Message key={i} message={chat.message} />
            ))}
          </Flex>
          <Spacer height={8} aria-hidden />
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
      </Flex>
    </AuthGuard>
  )
}
