'use client'

import { Box, Flex, Avatar, Text } from '@chakra-ui/react'

export type MessageProps = {
  username: string
  message: string
  profileImageUrl?: string
  createdAt: string
}

export const Message = ({
  username,
  message,
  createdAt,
  profileImageUrl,
}: MessageProps) => {
  return (
    <Flex alignItems={'start'}>
      <Avatar size="sm" src={profileImageUrl || undefined} />
      <Box ml={2}>
        <Flex align={'center'}>
          <Text as="b" ml={2}>
            {username}
          </Text>
          <Text ml={2} fontSize={12} color={'gray.500'}>
            {createdAt}
          </Text>
        </Flex>
        <Text bgColor={'gray.200'} rounded={'md'} px={2} py={1}>
          {message}
        </Text>
      </Box>
    </Flex>
  )
}
