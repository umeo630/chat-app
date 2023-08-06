import { ReactNode } from 'react'
import { useAuthContext } from '../provider/AuthProvider'
import { useRouter } from 'next/navigation'
import { Box, Spinner } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext()
  const { push } = useRouter()

  if (typeof user === 'undefined') {
    return (
      <Box
        position="fixed"
        top="0"
        right="0"
        bottom="0"
        left="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size={'lg'} />
      </Box>
    )
  }

  if (user === null) {
    push('/signin')
    return null
  }

  return <>{children}</>
}
