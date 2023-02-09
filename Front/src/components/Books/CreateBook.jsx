import { Container, FormLabel, Heading,Text, Input, VStack, Box, Button, HStack, Avatar} from '@chakra-ui/react';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import { uploadBook } from '../../redux/actions/userActions';

const CreateBook = ({user}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState("")
    const [ISBN, setISBN] = useState('');
    const [category, setCategory] = useState("")
  const [releasedAt, setReleasedAt] = useState('');
  const [tags, setTags] = useState('');
  const [fileprev, setFileprev] = useState('');
  const [file, setFile]= useState('')

    const imageHandler = (e) => {
        const nfile = e.target.files[0]
        const reader = new FileReader();

        reader.readAsDataURL(nfile)
        reader.onloadend = () => {
          setFileprev(reader.result)
          setFile(nfile)
          
        }
        
  }
  
  console.log(file);
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();
        const myform = new FormData()
      myform.append("title", title)
      myform.append('author', author);
        myform.append("excerpt", description)
        myform.append("ISBN", ISBN)
        myform.append("releasedAt", releasedAt)
      myform.append("category", category)
      myform.append('tags', tags)
      myform.append("userId", user._id)
      myform.append("bookcover", file.name)
      console.log(myform.excerpt)

        dispatch(uploadBook(myform))
        
    }
    
  return (
    <Container minh={'100vh'} paddingY={'10'}>
      <VStack h="full" justifyContent={'center'} spacing={'12'}>
        <Heading
          children="Upload Your Book"
          fontFamily={'cursive'}
          fontWeight="bold"
          mt={'6'}
        />
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Box display={'flex'} justifyContent={'center'}>
            <Avatar size={'xl'} src={fileprev}  />
          </Box>
          <Box my={'4'}>
            <FormLabel
              fontFamily={'cursive'}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Title
            </FormLabel>
            <Input
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              type={'text'}
              placeholder={'To Kill A MockingBird'}
              focusBorderColor="blue.500"
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel
              fontFamily={'cursive'}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Description
            </FormLabel>
            <Input
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              type={'text'}
              placeholder={'This is a story of Killing A MockingBird'}
              focusBordercolor="blue.500"
            />
          </Box>
          <Box marginY={'4'}>
            <FormLabel
              fontFamily={'cursive'}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Released At
            </FormLabel>
            <Input
              required
              value={releasedAt}
              onChange={e => setReleasedAt(e.target.value)}
              type={'date'}
              placeholder={'YYYY-MM-DD'}
              focusBordercolor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel
              fontFamily={'cursive'}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Author
            </FormLabel>
            <Input
              required
              value={author}
              onChange={e => setAuthor(e.target.value)}
              type={'text'}
              placeholder={'Lone'}
              focusBordercolor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel
              fontFamily={'cursive'}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              ISBN
            </FormLabel>
            <Input
              required
              value={ISBN}
              onChange={e => setISBN(e.target.value)}
              type={'number'}
              placeholder={'67686667867768'}
              focusBordercolor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel
              fontFamily={'cursive'}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Category
            </FormLabel>
            <Input
              required
              value={category}
              onChange={e => setCategory(e.target.value)}
              type={'text'}
              placeholder={'Fiction'}
              focusBordercolor="blue.500"
            />
          </Box>
          <Box my={'4'}>
            <FormLabel
              fontFamily={'cursive'}
              fontSize={'md'}
              fontWeight={'bold'}
            >
              Tags
            </FormLabel>
            <Input
              required
              value={tags}
              onChange={e => setTags(e.target.value)}
              type={'text'}
              placeholder={'Fiction, bio'}
              focusBordercolor="blue.500"
            />
          </Box>
          <Box my="4">
            <FormLabel
              htmlFor="profile"
              children="Select Book Cover"
              fontFamily={'cursive'}
              fontWeight={'bold'}
            />
            <Input
              type={'file'}
              accept={'image/*'}
              fontWeight={'bold'}
              id="profile"
              focusBordercolor="blue.500"
              onChange={imageHandler}
            />
          </Box>
          <HStack justifyContent={'space-evenly'}>
            <Box my={'6'} alignItems="center">
              <Text
                children="Go to Your Uploads? "
                fontFamily={'cursive'}
                fontSize={'md'}
                fontWeight={'bold'}
              />
              <Link to={'/myuploads'}>
                <Button colorScheme={'green'} variant={'ghost'}>
                  My Uploads
                </Button>
              </Link>
            </Box>
            <Box>
              <Button type="submit" colorScheme={'blue'}>
                {' '}
                Upload
              </Button>
            </Box>
          </HStack>
        </form>
      </VStack>
    </Container>
  );
}

export default CreateBook
