import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import ctn from '../../assets/Images/crtn.png'
import Intro from '../../assets/video/vid.mp4';
import { GoMarkGithub } from 'react-icons/go';
import { AiFillLinkedin } from 'react-icons/ai';

import {
  Box,
  Text,
  Stack,
  HStack,
  Image,
  VStack,
  Button,
  Heading,
} from '@chakra-ui/react';

const Homepage = () => {
  return (
    <section className="home">
      <div className="container">
        <Stack
          direction={['column', 'row']}
          height="100%"
          justifyContent={['center', 'space-between']}
          alignItems="center"
          spacing={['16', '56']}
        >
          <VStack
            width={'full'}
            spacing={'6'}
            fontSize={'xl'}
            alignItems={['center', 'flex-end']}
            fontFamily={'cursive'}
          >
            <Heading
              fontFamily={'cursive'}
              children="The Book Heaven."
              size={'2xl'}
            />
            <Text children="You can Find your favourte books here." />
            <Link to="/books">
              <Button size={'lg'} colorScheme={'blue'}>
                Explore
              </Button>
            </Link>
          </VStack>
          <Image
            className="vg"
            boxSize={'md'}
            src={ctn}
            objectFit={'contain'}
          />
        </Stack>
      </div>
      <Box padding={'8'} backgroundColor={'blackAlpha.700'}>
        <Heading
          children="Contacts"
          textAlign={'center'}
          fontFamily={'body'}
          color={'purple.300'}
        />
        <HStack
          className="cont"
          justifyContent={'space-around'}
          alignItems={'center'}
        >
          <AiFillLinkedin />
          <GoMarkGithub />
        </HStack>
      </Box>
      <div className="container2">
        <video
          autoPlay
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={Intro}
        ></video>
      </div>
    </section>
  );
};

export default Homepage;
