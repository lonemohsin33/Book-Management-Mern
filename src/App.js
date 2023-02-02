import React,{useEffect} from 'react';
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
import { useSelector, useDispatch } from 'react-redux'
import CreateBook from './components/Books/CreateBook';

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user, error,message } = useSelector(state => state.user)
  console.log(error, message)
  useEffect(()=>{
    if (error) {
      alert(error)
      dispatch({type:"clearError"})
    }
    if (message) {
      if (message.status == true) {
        
        alert(message)
        dispatch({type:"clearMessage"})
      }
    }
  },[dispatch, error, message])
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
          <Route path='/resetpassword/:token' element={<Resetpass />} /> 
          <Route path='/uploadbook' element={ <CreateBook/>}/>
          
          
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
