import {
  Container,
  FormLabel,
  Heading,
  Text,
  Input,
  VStack,
  Box,
  Stack,
  Button,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Profile = (props) => {
  const [file, setFile] = useState();
  
  let date = new Date(props.user.createdAt);
  // date=date.toDateString()
  const imageHandler = (e) => {
    
    const nfile = e.target.files[0]
    const reader = new FileReader();

    reader.readAsDataURL(nfile)

    reader.onloadend = () => {
      setFile(reader.result)
    }
    
  }
  

  return (
    <Container
      minH={'95vh'}
      maxW={'container.lg'}
   
      py="8"
    >
      <Heading
        m={'8'}
        children="Profile"
        fontFamily={'cursive'}
        textTransform={'uppercase'}
      />
      <Stack
        justifyContent={'flex-start'}
        direction={['column', 'row']}
        alignItems={['center', 'flex-start']}
        spacing={['8', '16']}
        p={'8'}
      >
        <VStack >
          <Avatar src={file} boxSize={'48'} />
          <Button variant={'ghost'} colorScheme={'blue'}>
            Upload Photo
          </Button>
        </VStack>
        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
          <HStack
            fontFamily={'cursive'}
            fontWeight={['bold', '200']}
            fontSize={['md', 'xl']}
          >
            <Text>Name:</Text>
            <Text>{props.user.name}</Text>
          </HStack>
          <HStack
            fontFamily={'cursive'}
            fontWeight={['bold', '200']}
            fontSize={['md', 'xl']}
          >
            <Text children="Email:" />
            <Text children={props.user.email} />
          </HStack>
          <HStack
            fontFamily={'cursive'}
            fontWeight={['bold', '200']}
            fontSize={['md', 'xl']}
          >
            <Text children="Member Since:" />
            <Text children={date.toDateString()} />
          </HStack>
          <HStack
            fontFamily={'cursive'}
            fontWeight={['bold', '200']}
            fontSize={['md', 'xl']}
          >
            <Text children="User-Id:" />
            <Text children={props.user._id} />
          </HStack>
          <Stack
            direction={['column', 'row']}
            alignItems={['center', 'flex-start']}
          >
            <Link to={'/updateprofile'}>
              <Button colorScheme={'blue'}>Update Profile</Button>
            </Link>
            <Link to={'/changepassword'}>
              <Button colorScheme={'blue'}>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Heading children={'PlayList'} size={'lg'} my='8'/>
    </Container>
  );
};

export default Profile;
