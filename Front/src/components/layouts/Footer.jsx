import React from 'react'
import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import { GoMarkGithub } from 'react-icons/go'
import { AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <Box padding={'4'} height={'10vh'} bg={'blackAlpha.700'}>
      <Stack direction={['column', 'row']}>
        <VStack alignItems={['center', 'flex-start']} width={'full'}>
          <Heading
            className="footer"
            children="All Rights Reserved"
            fontFamily={'cursive'}
            color={'whiteAlpha.700'}
          />
          <Heading
            className="footer"
            children="@lonemohsin33"
            fontFamily={'cursive'}
            size={'sm'}
            color={'whiteAlpha.800'}
          />
        </VStack>
        <HStack
          justifyContent="center"
          spacing={['2', '10']}
          color="whiteAlpha.700"
          fontSize={'50'}
        >
          <a
            rel="noreferrer"
            className="footer"
            href="https://github.com/lonemohsin33"
            target={'_blank'}
          >
            <GoMarkGithub />
          </a>
          <a
            rel="noreferrer"
            className="footer"
            href="https://www.linkedin.com/in/lone-mohsin/"
            target={'_blank'}
          >
            <AiFillLinkedin />
          </a>
        </HStack>
      </Stack>
    </Box>
  );
}

export default Footer
