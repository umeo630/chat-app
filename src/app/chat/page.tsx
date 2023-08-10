'use client'

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
import { useEffect, useState } from 'react'

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

  return (
    <Container py={14}>
      <Heading>チャット</Heading>
      <Spacer height={8} aria-hidden />
      <Flex direction={'column'} gap={2} overflowY={'auto'} height={400}>
        {chats.map((chat, i) => (
          <Message key={i} message={chat.message} />
        ))}
      </Flex>
      <Spacer height={4} aria-hidden />
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
  )
}
