'use client'

import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
  Spacer,
  chakra,
} from '@chakra-ui/react'

export default function Page() {
  return (
    <Container py={14}>
      <Heading>サインイン</Heading>
      <chakra.form>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input type={'email'} />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input type={'password'} />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={'submit'}>ログイン</Button>
        </Center>
      </chakra.form>
    </Container>
  )
}
