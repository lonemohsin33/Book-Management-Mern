import React from 'react';
import axios from 'axios';
import {
    Avatar,
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState,useEffect} from 'react';
import { Link } from 'react-router-dom';

const Register =  () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
     const [number, setNumber] = useState('');
   
    const imageHandler = (e) => { 
        const nfile = e.target.files[0];
        const reader = new FileReader();
        
        reader.readAsDataURL(nfile);
        reader.onloadend = () => {
            setFile(reader.result);
        }
}

  return (
    <Container h={'100vh'}>
      <VStack h={'full'} justifyContent={'center'} spacing={'10'} p={'8'}>
        <Heading children="Create An Account" fontFamily={'cursive'} mt={'4'} />

        <form style={{ width: '100%' }}>
          <Box display={'flex'} justifyContent={'center'}>
            <Avatar size={'2xl'} src={file} />
          </Box>
          <Box my={'4'}>
            <FormLabel
              htmlFor="title"
              children="Title"
              fontFamily={'cursive'}
              fontWeight={'bold'}
            />
            <Input
              type={'text'}
              required
              value={title}
              fontWeight={'bold'}
              onChange={e => setTitle(e.target.value)}
              placeholder={'Mr Mrs Ms'}
              id="title"
              focusBorderColor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel
              htmlFor="name"
              children="Username"
              fontFamily={'cursive'}
              fontWeight={'bold'}
            />
            <Input
              type={'text'}
              required
              value={name}
              fontWeight={'bold'}
              onChange={e => setName(e.target.value)}
              placeholder={'lone'}
              id="name"
              focusBorderColor="blue.500"
            />
          </Box>
          <Box my={'6'}>
            <FormLabel
              htmlFor="email"
              children="Email Id"
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
            <FormLabel
              htmlFor="phone"
              children="Phone Number"
              fontFamily={'cursive'}
              fontWeight={'bold'}
            />
            <Input
              type={'number'}
              required
              value={number}
              fontWeight={'bold'}
              onChange={e => setNumber(e.target.value)}
              placeholder={'7889899999'}
              id="phone"
              focusBorderColor="blue.500"
            />
          </Box>
          <Box my="4">
            <FormLabel
              htmlFor="profile"
              children="Select Profile Image"
              fontFamily={'cursive'}
              fontWeight={'bold'}
            />
            <Input
              type={'file'}
              accept={'image/*'}
              required
              fontWeight={'bold'}
              id="profile"
              focusBorderColor="blue.500"
              onChange={imageHandler}
            />
          </Box>
          <Button my={'4'} type="submit" colorScheme={'blue'}>
            Register
          </Button>
          <Box my="2">
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

export default Register;
