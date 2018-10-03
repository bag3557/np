import { USER_LOGGED_IN } from './types'

export const socialLogin = (userProfile) => dispatch => {
    localStorage.newsJWT = userProfile.token;
    dispatch(userLoggedIn(userProfile))
}

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
})