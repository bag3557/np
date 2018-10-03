import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types'

export const socialLogin = (userProfile) => dispatch => {
    localStorage.newsJWT = userProfile.token
    localStorage.name = userProfile.name
    localStorage.email = userProfile.email
    dispatch(userLoggedIn(userProfile))
}

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})

export const logout = () => dispatch => {
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('newsJWT')
        dispatch(userLoggedOut())
    };