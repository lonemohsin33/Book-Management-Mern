import React from 'react'
import {Box, Button, Container, FormLabel, Heading, Input, VStack} from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const ForgotPass = () => {
    const [email, setEmail] = useState('')

  return (
    <Container h={'90vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Forgot Password" textTransform={'uppercase'} fontFamily={'cursive'} />

        <form style={{ width: '100%' }}>
          
          <Box my={'4'}>
            <FormLabel
              htmlFor="email"
              children="UserName or Email"
              fontFamily={'cursive'}
              fontWeight={'bold'}
            />
            <Input
              type={'email'}
              required
              value={email}
              fontWeight={'bold'}
              onChange={e => setEmail(e.target.value)}
              placeholder={'lone@gmail.com'}
              id="email"
              focusBordercolor="blue.500"
            />
          </Box>

          <Button my={'4'} type="submit" colorScheme={'blue'}>
            Send Reset Link
          </Button>
          <Box my="10">
            Dont have an Account Yet?
            <Link to={'/register'}>
              <Button
                colorScheme={'blue'}
                mx={'2'}
                variant={'link'}
                fontSize="md"
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default ForgotPass
