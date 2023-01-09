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
import Homepage from './components/Homepage';
import Header from './components/layouts/Header';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
