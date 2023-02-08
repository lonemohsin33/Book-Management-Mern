import React from 'react';
import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Resetpass = () => {
    const [password, setPassword] = useState('');
    const params = useParams()
    console.log(params.token)

  return (
    <Container h={'90vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
        <Heading children="Reset Password" textTransform={'uppercase'} fontFamily={'cursive'} />

        <form style={{ width: '100%' }}>
          <Box>
            <FormLabel
              htmlFor="password"
              children="Create New Password"
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
              focusBordercolor="blue.500"
            />
          </Box>

          <Button my={'6'} type="submit" colorScheme={'blue'}>
            Reset Password
          </Button>
          <Box my="10">
            Already a User?
            <Link to={'/login'}>
              <Button
                colorScheme={'blue'}
                mx={'2'}
                variant={'link'}
                fontSize="md"
              >
                Login
              </Button>
            </Link>
          </Box>
        </form>
      </VStack>
    </Container>
  );
};

export default Resetpass;
