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
import { ProtectedRoute } from 'protected-route-react';
import Profile from './components/profile/Profile';
import {profile} from './redux/actions/userActions'
import {toast} from 'react-hot-toast'
import ChangePassword from './components/profile/ChangePassword';
import UpdateProfile from './components/profile/UpdateProfile';
import Loader from './components/layouts/Loader';

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated, user, error,message, loading} = useSelector(state => state.user)
  console.log(error, message)
  useEffect(()=>{
    if (error) {
      toast.error(error)
        
      dispatch({type:"clearError"})
    }
    if (message) {
      toast.success(message)
      
        dispatch({type:"clearMessage"})
      
    }
  }, [dispatch, error, message])

   useEffect(() => {
     dispatch(profile());
   }, [dispatch]);
  
  
  
  
  return (
    <Router>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <Header isAuthenticated={isAuthenticated} user={user} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/books" element={<Books />} />
            <Route
              path="/login"
              element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<ForgotPass />} />
            <Route path="/resetpassword/:token" element={<Resetpass />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/changepassword"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updateprofile"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/uploadbook"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <CreateBook user={user} />
                </ProtectedRoute>
              }
            />

            {/* <Route path="/uploadbook" element={} /> */}
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;
