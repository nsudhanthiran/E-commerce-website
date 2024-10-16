import axios from 'axios';
import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGIN_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_LOGOUT } from '../constants/userConstants';

export const signup  = (fname, lname, email, username, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_SIGNUP_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/', {first_name: fname,last_name: lname, email: email, username: username,password: password},config)
        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        })
        // localStorage.setItem('userInfo', JSON.stringify(data))
    }
    catch(error){
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

export const login  = ( username, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/users/login/', {username: username,password: password},config)
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))}
    catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail // This should catch the custom error message
                : error.message,
          })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}