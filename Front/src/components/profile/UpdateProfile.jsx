import React, { useState } from 'react';
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react';

const UpdateProfile = () => {
    const [email, setEmail] = useState("")
     const [name, setName] = useState('');
    
  return (
    <Container py={'16'} minH={'95vh'}>
      <form>
        <Heading
          children="Update Profile"
          fontFamily={'cursive'}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
          py={'16'}
        />
        <VStack spacing={'8'}>
          <Input
            value={name}
            placeholder={'Enter Name'}
            onChange={e => setName(e.target.value)}
            type={'text'}
            focusBorderColor={'blue.500'}
            required
          />
          <Input
            value={email}
            placeholder={'Enter Email'}
            onChange={e => setEmail(e.target.value)}
            type={'email'}
            focusBorderColor={'blue.500'}
            required
          />

          <Button type="submit" colorScheme={'blue'}>
            {' '}
            Change Password
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default UpdateProfile;
