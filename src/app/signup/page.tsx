'use client'

import { ImageUploader } from '@/components/ImageUploader/ImageUploader'
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
  useToast,
} from '@chakra-ui/react'
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from 'firebase/auth'
import { getDatabase, ref, set } from 'firebase/database'
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const toast = useToast()
  const { push } = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
    e.preventDefault()
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      let profileImageUrl = ''
      if (profileImage) {
        profileImageUrl = await uploadImageToFirebase(
          profileImage,
          userCredential.user.uid
        )
      }

      const db = getDatabase()
      const userRef = ref(db, `users/${userCredential.user.uid}`)
      await set(userRef, {
        username: username,
        email: email,
        profileImageUrl,
        createdat: new Date().toLocaleString(),
      })

      toast({
        title: '確認メールを送信しました',
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      await sendEmailVerification(userCredential.user)
      setEmail('')
      setPassword('')
      push('/chat')
    } catch (error) {
      toast({
        title: 'エラーが発生しました',
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const uploadImageToFirebase = async (file: File, userId: string) => {
    const storage = getStorage()
    const ref = storageRef(storage, `profileImages/${userId}`)
    await uploadBytes(ref, file)
    return getDownloadURL(ref)
  }

  return (
    <Container py={14}>
      <Heading>サインアップ</Heading>
      <chakra.form onSubmit={handleSubmit}>
        <Spacer height={8} aria-hidden />
        <Grid gap={4}>
          <Box display={'contents'}>
            <FormControl>
              <FormLabel>メールアドレス</FormLabel>
              <Input
                type={'email'}
                name={'email'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>パスワード</FormLabel>
              <Input
                type={'password'}
                name={'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>ユーザー名</FormLabel>
              <Input
                type={'text'}
                name={'username'}
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>プロフィール画像</FormLabel>
              <ImageUploader onFileChange={setProfileImage} />
            </FormControl>
          </Box>
        </Grid>
        <Spacer height={4} aria-hidden />
        <Center>
          <Button type={'submit'} isLoading={isLoading}>
            アカウントを作成
          </Button>
        </Center>
      </chakra.form>
    </Container>
  )
}
