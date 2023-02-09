import React, { useState } from 'react'
import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'

const ChangePassword = () => {

    const [oldpassword, setOldpassword] = useState("");
    const [newpassword, setNewpassword] = useState('');

  return (
    <Container py={'16'} minH={'95vh'}>
      <form>
        <Heading
          children="Change Password"
          fontFamily={'cursive'}
          textAlign={['center', 'left']}
          textTransform={'uppercase'}
          py={'16'}
        />
        <VStack spacing={'8'}>
          <Input
            value={oldpassword}
            placeholder={'Enter Old Password'}
            onChange={e => setOldpassword(e.target.value)}
            type={'password'}
            focusBorderColor={'blue.500'}
            required
          />
          <Input
            value={newpassword}
            placeholder={'Enter New Password'}
            onChange={e => setNewpassword(e.target.value)}
            type={'password'}
            focusBorderColor={'blue.500'}
            required
                  />
                  
                  <Button type='submit' colorScheme={'blue'}> Change Password</Button>
        </VStack>
      </form>
    </Container>
  );
}

export default ChangePassword
