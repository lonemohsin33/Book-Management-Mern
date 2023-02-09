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
  Image,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import {RiDeleteBin7Fill} from 'react-icons/ri'


const Profile = (props) => {
  
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [file, setFile]= useState("")
  
  let date = new Date(props.user.createdAt);
  // date=date.toDateString()
 
  const deleteBookfromplaylist = (id) => {
    // e.preventDefault();

  }
  const changeImageSubmit = (e, image) => {
    e.preventDefault();
    console.log(image)
    setFile(image);
    onClose();
    
  }
  

  return (
    <Container minH={'95vh'} maxW={'container.lg'} py="8">
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
        <VStack>
          <Avatar src={props.user.profile.url} boxSize={'48'} />
          <Button variant={'ghost'} colorScheme={'blue'} onClick={onOpen}>
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
      <Heading children={'PlayList'} size={'lg'} my="8" />
      {/* {props.user.PlayList.length > 0 && (
        <Stack
        
          direction={['column', 'row']}
          alignItems={'center'}
          flexWrap={'wrap'}
          p={'4'}
        >
          {
            props.user.PlayList.map((elem) => (
              <VStack key={elem._id} w={'48'} m='2'>

                <Image boxSize={'full'} objectFit={'contain'} src={elem.poster} />
                <HStack >
                  <Link to={`/books/${elem.book}`}>
                    <Button variant={'ghost'} colorScheme={'blue'}>Read Now</Button>
                  </Link>
                  <Button onClick={()=>deleteBookfromplaylist(elem.book)}>
                    <RiDeleteBin7Fill/>
                  </Button>


                </HStack>


              </VStack>

            )
              
            )
          }




        </Stack>
      )} */}
      <ChangephotoBox isOpen={isOpen} onClose={onClose } changeImageSubmit={changeImageSubmit} />
    </Container>
  );
};

export default Profile;

function ChangephotoBox({ isOpen, onClose,changeImageSubmit }) {
  const [imagePrev, setImagePrev] = useState();
  const [image, setImage] = useState();

  const closeHandler = () => {
    onClose();
    setImagePrev("")
    setImage("")
  }

  const imageHandler = e => {
    const nfile = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(nfile);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(nfile)
    };
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={e => changeImageSubmit(e, image)}>
              <VStack spacing={'8'}>
                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}

                <Input type={'file'} onChange={imageHandler} />
                <Button type="submit" w={'full'} colorScheme="blue">
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button onClick={closeHandler}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
