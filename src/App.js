import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  Stack,
  HStack,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Home/Homepage';
import Header from './components/layouts/Header';
import Books from './components/Books/Books';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path='/books' element={ <Books/> } />
          
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;
