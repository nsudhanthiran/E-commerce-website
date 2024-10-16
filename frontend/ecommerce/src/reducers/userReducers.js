import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL, USER_LOGOUT } from '../constants/userConstants';

// Helper function to get user info from localStorage
const getUserFromStorage = () => {
    const userInfoString = localStorage.getItem('userInfo');
    return userInfoString ? JSON.parse(userInfoString) : null;
}

export const userSignupReducer = (state = {}, action) => {
    switch(action.type){
        case USER_SIGNUP_REQUEST:
            return {loading: true}
        case USER_SIGNUP_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case USER_SIGNUP_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const userLoginReducer = (state = { userInfo: getUserFromStorage() }, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading: true}
        case USER_LOGIN_SUCCESS:
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            return {loading: false, userInfo: action.payload}
        case USER_LOGIN_FAIL:
            return {loading: false, error: action.payload}
        case USER_LOGOUT:
            localStorage.removeItem('userInfo');
            return {}
        default:
            return state
    }
}