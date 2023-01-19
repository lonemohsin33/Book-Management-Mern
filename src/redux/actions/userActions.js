import { server } from "../store";
import axios from "axios";


const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: "loginRequest" })
        const { data} = await axios.post(`${server}/login`, { email, password }, {
            headers: {
                'content-type': 'application/json'
            },
            withCredentials: true,
        });
        dispatch({type:"loginSuccess", payload:data})
        
    }
    catch (err) {
        dispatch({type:"loginFail", payload:err.response.data.message})
        
    }
    
}
export default login