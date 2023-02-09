import { server } from "../store";
import axios from "axios";


export const login = (email, password) => async (dispatch) => {
    try { 
        dispatch({ type: "loginRequest" })
        const data = await axios.post('http://localhost:4000/login', { email, password },{
          withCredentials:true
        });
        // console.log(data);
      dispatch({ type: "loginSuccess", payload: data.data})
        
    }
    catch (err) {
      console.log(err);
        dispatch({type:"loginFail", payload:err.response.data.msg})
        
    }
    
}
export const profile = () => async (dispatch) => {
  try {
    dispatch({ type: 'loadUserRequest' });
    const data = await axios.get('http://localhost:4000/me', {
      withCredentials:true
    });
    console.log(data);
    dispatch({ type: 'loadUserSuccess', payload: data.data});
  } catch (err) {
    console.log(err);
    dispatch({ type: 'loadUserFail', payload: err.response.data.message });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: 'logoutRequest' });
    const data = await axios.get('http://localhost:4000/logout', {
      withCredentials: true,
    });
    console.log(data);
    dispatch({ type: 'logoutSuccess', payload: data.data});
  } catch (err) {
    console.log(err);
    dispatch({ type: 'logoutFail', payload: err.response.data.msg });
  }
};
export const signup =
  (form) => async dispatch => {
    try {
      dispatch({ type: 'signupRequest' });
      const data = await axios.post(
        'http://localhost:4000/register',
        form, {
          headers: {
            'Content-type': "multipart/form-data",
          },withCredentials:true
        }
      );
      console.log(data.data)
      
      dispatch({ type: 'signupSuccess', payload: data.data});
    } catch (err) {
      console.log(err)
      dispatch({ type: 'signupFail', payload: err.response.data.msg});
    }
  };

export const getBooks = () => async (dispatch) => {
  try {
    dispatch({ type: "bookRequest" })
    const books = await axios.get('http://localhost:4000/getbooks')
    console.log(books)
    
    dispatch({type:"bookSuccess", payload:books.data.message})
  }
  catch (err) {
    dispatch({type:"bookFail", payload:err.response.data.message})
    
  }
  }

  export const uploadBook = (form) => async dispatch => {
    try {
      dispatch({ type: 'bookUpRequest' });
      const books = await axios.post(
        'http://localhost:4000/books',
        form,
        {
          withCredentials: true,
        }
      );
      console.log(books);

      dispatch({ type: 'bookUpSuccess', payload: books.data.message });
    } catch (err) {
      dispatch({ type: 'bookUpFail', payload: err.response.data.message });
    }
  };
