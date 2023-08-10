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
import { getDatabase, push, ref } from 'firebase/database'
import { useState } from 'react'

const _message = '確認用のメッセージです'
const _messages = [...Array(10)].map((_, i) => _message.repeat(i + 1))

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
  return (
    <Container py={14}>
      <Heading>チャット</Heading>
      <Spacer height={8} aria-hidden />
      <Flex direction={'column'} gap={2} overflowY={'auto'} height={400}>
        {_messages.map((message, i) => (
          <Message key={i} message={message} />
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
