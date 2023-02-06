import {
  Container,
  FormLabel,
  Heading,
  Text,
  Input,
  VStack,
  Box,
  Button,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Profile = (props) => {
  

  return (
    <Container minH={'90vh'} minW={['100%',"container.lg"]} border={'1px solid red'} p="6">
      <HStack 
      flexDirection={['column', 'row']}
        alignItems={['center','flex-start']}>
        <HStack border={'1px solid'} flexDirection={'column'}>
          <Avatar size={['2xl', '3xl']} />
          <FormLabel
            fontSize={'md'}
            fontFamily={'cursive'}
            fontWeight={'bold'}
          >Change Photo</FormLabel>
          <Input 
            type={'file'}
            accept={'image/*'}
            // onChange={imageHandler}
            


          
            
            />
        </HStack>
        <HStack
          fontFamily={'cursive'}
          fontWeight={['bold', '200']}
          fontSize={['md', 'xl']}
          
          border={'1px solid red'}
          flexDirection={'column'}
         
          minH={['15vh',"30vh"]}
          
          justifyContent={'space-evenly'}
        >
          <Text>Email: {props.user.email}</Text>
          <Text>UserId: {props.user._id}</Text>
          <Text>User Since: {props.user.createdAt.slice(0, 10)}</Text>
        </HStack>
      </HStack>
    </Container>
  );
};

export default Profile;
