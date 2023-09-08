'use client'

import {
  Spacer,
  Flex,
  chakra,
  Button,
  Container,
  Input,
  Text,
  Box,
} from '@chakra-ui/react'
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  get,
  orderByChild,
  query,
} from 'firebase/database'
import { useRef, useState, useEffect } from 'react'
import { Message } from './Message'
import { useUserContext } from '@/feature/user/provider/UserProvider'
import { useAuthContext } from '@/feature/auth/provider/AuthProvider'

export const ChatRoom = () => {
  const messageElementRef = useRef<HTMLDivElement | null>(null)
  const { user } = useAuthContext()
  const [message, setMessage] = useState<string>('')
  const { selectedUser } = useUserContext()
  const [chats, setChats] = useState<
    {
      sendername: string
      senderImageUrl: string
      message: string
      createdAt: string
    }[]
  >([])
  const generateChatId = (currentUserId: string, selectedUserId: string) => {
    const sortedIds = [currentUserId, selectedUserId].sort()
    return sortedIds.join('_')
  }

  const searchUser = async (userId: string) => {
    try {
      const db = getDatabase()
      const dbRef = ref(db, `users/${userId}`)
      const snapshot = await get(dbRef)
      return snapshot.val()
    } catch (error) {
      console.log(error)
    }
  }

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const db = getDatabase()
      const chatId = generateChatId(user?.uid ?? '', selectedUser?.id ?? '')
      const dbRef = ref(db, `chat/${chatId}`)
      await push(dbRef, {
        message,
        senderId: user?.uid,
        receiverId: selectedUser?.id,
        createdAt: new Date().toLocaleString(),
      })
      setMessage('')
      fetchChats()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchChats = async () => {
    try {
      setChats([])
      const db = getDatabase()
      const chatId = generateChatId(user?.uid ?? '', selectedUser?.id ?? '')
      const dbRef = ref(db, `chat/${chatId}`)

      return onChildAdded(dbRef, async (snapshot) => {
        const data = snapshot.val()
        const senderData = await searchUser(data.senderId ?? '')

        const newChat = {
          sendername: senderData.username,
          senderImageUrl: senderData.profileImageUrl ?? '',
          message: data.message ?? '',
          createdAt: data.createdAt ?? '',
        }

        setChats((prevChats) => {
          const updatedChats = [...prevChats, newChat]
          return updatedChats.sort((a, b) => {
            return a.createdAt > b.createdAt ? 1 : -1
          })
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchChats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedUser?.id])

  useEffect(() => {
    messageElementRef.current?.scrollTo({
      top: messageElementRef.current.scrollHeight,
    })
  }, [chats])

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
              profileImageUrl={chat.senderImageUrl}
              username={chat.sendername}
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
