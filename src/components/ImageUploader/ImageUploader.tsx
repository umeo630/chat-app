import { Box, Icon, Image, Input, VStack } from '@chakra-ui/react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { useState } from 'react'

export const ImageUploader = () => {
  const [profileImage, setProfileImage] = useState<string | ArrayBuffer | null>(
    null
  )

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <VStack spacing={4} alignItems="center">
      <Box
        width="100px"
        height="100px"
        position="relative"
        overflow="hidden"
        borderRadius="50%"
      >
        <Image
          src={profileImage as string | undefined}
          alt="Profile"
          fit="cover"
          width="100%"
          height="100%"
          fallback={<Box bgColor="gray.200" width="100%" height="100%" />}
        />
        <Input
          type="file"
          accept="image/*"
          display="none"
          id="upload"
          onChange={handleImageChange}
        />
        <Box
          position="absolute"
          top="0"
          right="0"
          bottom="0"
          left="0"
          display="flex"
          alignItems="center"
          justifyContent="center"
          cursor="pointer"
          as="label"
          htmlFor="upload"
        >
          <Icon
            as={IoCloudUploadOutline}
            w={6}
            h={6}
            color="white"
            display={profileImage ? 'none' : 'flex'}
          />
        </Box>
      </Box>
    </VStack>
  )
}
