'use client'

import {
  Heading,
  Spacer,
  Flex,
  chakra,
  Button,
  Container,
  Input,
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

  const { selectedUser } = useUserContext()

  return (
    <Container py={14}>
      <Heading>{selectedUser?.username}</Heading>
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
  )
}
