'use client'

import { Box, Flex, Avatar, Text } from '@chakra-ui/react'

type MessageProps = {
  message: string
}

export const Message = ({ message }: MessageProps) => {
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
