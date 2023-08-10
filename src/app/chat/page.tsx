'use client'

import {
  Button,
  Container,
  Heading,
  Input,
  Spacer,
  chakra,
} from '@chakra-ui/react'
import { getDatabase, push, ref } from 'firebase/database'
import { useState } from 'react'

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
