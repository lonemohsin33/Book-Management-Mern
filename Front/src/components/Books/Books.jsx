import React from 'react'
import { Button, Container, Heading, HStack, Input, Stack , VStack,Text, Image} from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../redux/actions/userActions';
const Book = ({ title, imageSrc, author, description, tags, price, id, addtoplaylisthandler }) => {
  
  
  return (
    <VStack alignItems={['center', 'flex-start']} className="books">
      <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />

      <Heading
        alignItems={['center', 'left']}
        minW="200px"
        size={'md'}
        noOfLines={2}
        children={title}
        fontFamily={'body'}
      />

      <HStack>
        <Text
          children={'Author'}
          textTransform={'uppercase'}
          size={'sm'}
          fontWeight={'bold'}
        />
        <Text
          children={'@' + author}
          textDecoration={'underline'}
          textTransform={'uppercase'}
        />
      </HStack>
      <Text children={description} noOfLines={2} />
      <HStack>
        <Text children={'Tags :'} size={'xs'} />
        <Text children={tags + ''} size={'xs'} />
      </HStack>
      <HStack>
        <Text children={'Price :'} size={'md'} fontWeight={'bold'} />
        <Text children={price} />
      </HStack>
      <Stack direction={['column', 'row']} alignItems={'center'}>
        <Link to={`/books/${id}`}>
          <Button colorScheme={'blue'}> Read Now</Button>
        </Link>
        <Button colorScheme={'blue'} variant={'ghost'}
          onClick={()=>(addtoplaylisthandler(id))}> Add to PlayList</Button>
      </Stack>
    </VStack>
  );
}


const Books = () => {
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")

const {message} = useSelector(state=> state.book)

  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getBooks());
  },[dispatch])
    
 
  const addtoplaylisthandler = () => {
    console.log("Added to playlist")
    
  }
  const categories= ["Action", "Adventure", "Fiction", "Classic", "Epic", "Sci-Fi"]
  return (
    <Container minH={'95vh'} minW={'container.lg'} paddingY={'8'}>
      <Heading children="ALL BOOKS" m={'8'} />

      <Input
        type={'text'}
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
        focusbordercolor={'blue'}
        placeholder="Browse your favourite books...."
      />

      <HStack overflow={'auto'} py={'6'}>
        {categories.map((elem, index) => (
          <Button minW={'60'} key={index} onClick={() => setCategory(elem)}>
            <Text children={elem} />{' '}
          </Button>
        ))}
      </HStack>
      <Stack
        direction={['column', 'row']}
        flexWrap="wrap"
        justifyContent={['center', 'space-evenly']}
        alignItems={['center', 'flex-start']}
      >
        {message.length > 0 &&
          message.map(elem => (
            <Book
              key ={elem._id}
              author={elem.author}
              title={elem.title}
              description={elem.description}
              tags={elem.tags}
              imageSrc={elem.bookcover}
              price={elem.price}
              id={elem._id}
              addtoplaylisthandler={addtoplaylisthandler}
            />
          ))}
      </Stack>
    </Container>
  );
}

export default Books
