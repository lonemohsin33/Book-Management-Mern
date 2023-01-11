import React from 'react'
import {Box, Button, Container, FormLabel, Heading, Input, VStack} from '@chakra-ui/react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const resonse = fetch('/api/login', {
        method:'post',
        body:'formData'
    }
    ).then(res => {
        if(res.ok) return res.json()
    })

  return (
    <Container h={'95vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'12'}>
        <Heading children="Welcome to The Book Heaven" fontFamily={'cursive'}/>

        <form style={{ width: '100%' }}>
          <Box my={'6'}>
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
              focusBorderColor="blue.500"
            />
          </Box>

          <Box>
            <FormLabel
              htmlFor="password"
              children="Password"
              fontFamily={'cursive'}
              fontWeight={'bold'}
            />
            <Input
              type={'password'}
              required
              value={password}
              fontWeight={'bold'}
              onChange={e => setPassword(e.target.value)}
              placeholder={'Xyz@789'}
              id="password"
              focusBorderColor="blue.500"
            />
          </Box>
          <Box>
            <Link to={'/forgotpassword'}>
              <Button my={'2'} variant={'link'}>
                Forgot Password?
              </Button>
            </Link>
          </Box>
          <Button my={'4'} type="submit" colorScheme={'blue'}>
            Login
                  </Button>
                  <Box my='4' >
                      Dont have an Account Yet? 
                      <Link to={'/register'} >
                          <Button colorScheme={'blue'} mx={'2'} variant={'link'} fontSize='md'>Sign Up</Button>
                      </Link>
                  </Box>
        </form>
      </VStack>
    </Container>
  );
}

export default Login
