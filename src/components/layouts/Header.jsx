import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import React from 'react';
import {RiMenu5Fill} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../ColorModeSwitcher';

const Header = () => {
  const { onClose, isOpen, onOpen } = useDisclosure()
  const ButtonLink = ({ path='/', name='Home' }) => (
    <Link to={path}>
      <Button variant={'ghost'}>
        {name}
      </Button>
    </Link>
    
    
  )
  const isAuthenticated = false;
  
  return (
    <>
      <ColorModeSwitcher />
      <Button
        onClick={onOpen}
        colorScheme={'blue'}
        top={'6'}
        left={'6'}
        width={'12'}
        height={'12'}
        position={'fixed'}
        rounded={'2xl'}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay backdropFilter={'blur(2px)'}>
          <DrawerContent>
            <DrawerHeader borderBottomWidth={'1px'}>BOOK WORMS</DrawerHeader>
            <DrawerBody>
              <VStack spacing={'4'} alignItems={'flex-start'} >
                <ButtonLink />
                <ButtonLink path="/books" name="All Books" />
                <ButtonLink path="/books/classics" name={"Classics"} />
                <ButtonLink path="/books/modern-books" name="Modern Books" />
                <ButtonLink path="/about" name="About" />
                <HStack>
                  


                </HStack>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};


export default Header;
