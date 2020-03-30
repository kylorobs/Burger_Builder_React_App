import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: id
    }
}

export const authFail = (er) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: er
    }
}

export const logOut = (er) => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (authTimeOut) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, authTimeOut * 1000)
    }
}

export const authInit = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {returnSecureToken: true, email, password}
        let url = isSignUp ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8NwcncIQC9Vx8oq0Cybb2LsUEn9gbQss' : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8NwcncIQC9Vx8oq0Cybb2LsUEn9gbQss';
            axios.post(url, authData)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeOut(res.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const authChangeRedirectPath = (path) => {
    return {
        type: actionTypes.AUTH_CHANGE_REDIRECT_PATH,
        path
    }
}

export const authCheckState =() => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) dispatch(logOut());
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate < new Date()) dispatch(logOut());
            else {
                dispatch(authSuccess(token, localStorage.getItem('userId')))
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000 ))
            }
        }
    }
}