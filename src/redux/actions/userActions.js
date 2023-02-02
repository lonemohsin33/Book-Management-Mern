import { server } from "../store";
import axios from "axios";


export const login = (email, password) => async (dispatch) => {
    try { 
        dispatch({ type: "loginRequest" })
        const data = await axios.post('http://localhost:4000/login', { email, password });
        console.log(data);
      dispatch({ type: "loginSuccess", payload: data.data })
        
    }
    catch (err) {
      console.log(err);
        dispatch({type:"loginFail", payload:err.response.data.msg})
        
    }
    
}
export const signup =
  (email, password, name, phone, title) => async dispatch => {
    try {
      dispatch({ type: 'signupRequest' });
      const data = await axios.post(
        'http://localhost:4000/register',
        {
          email,
          password,
          name,
          phone,
          title,
        }
      );
      console.log(data)
      
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

  export const uploadBook = (title, excerpt, author, ISBN, releasedAt, category,userId) => async dispatch => {
    try {
      dispatch({ type: 'bookUpRequest' });
      const books = await axios.post('http://localhost:4000/books', {
        title,
        excerpt,
        author,
        ISBN,
        releasedAt,
        category,
        userId
      });
      console.log(books);

      dispatch({ type: 'bookUpSuccess', payload: books.data.message });
    } catch (err) {
      dispatch({ type: 'bookUpFail', payload: err.response.data.message });
    }
  };
