'use client'

import { Sidebar } from '@/app/chat/Sidebar'
import { AuthGuard } from '@/feature/auth/component/AuthGuard'
import { UserProvider } from '@/feature/user/provider/UserProvider'
import { Flex } from '@chakra-ui/react'
import { ChatRoom } from './chat/ChatRoom'

export default function Page() {
  return (
    <AuthGuard>
      <UserProvider>
        <Flex>
          <Sidebar />
          <ChatRoom />
        </Flex>
      </UserProvider>
    </AuthGuard>
  )
}
