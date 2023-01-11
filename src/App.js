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
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPass from './components/Auth/ForgotPass';
import Resetpass from './components/Auth/Resetpass';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/forgotpassword' element={<ForgotPass />} />
          <Route path='/resetpassword/:token' element={<Resetpass/>}/> 
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
