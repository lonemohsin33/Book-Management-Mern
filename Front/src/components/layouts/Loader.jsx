import { Container,Spinner,VStack } from '@chakra-ui/react'
import React from 'react'

const Loader = ({color='blue.500'}) => {
  return (
      <VStack justifyContent={'center'} h={'100vh'}>
          <div style={{transform:"scale(3)"}}>
              <Spinner thickness='3px' speed='0.5s'
                  emptyColor='transparent'
                  color={color}
              
              
              />
              
          </div>
      
      </VStack>
  )
  
}

export default Loader
