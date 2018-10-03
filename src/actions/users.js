import { USER_LOGGED_IN, USER_LOGGED_OUT } from './types'

/*  This action will get user details after successful login and save it in localstorage
*   After storing user profile at localstorage, it will dispatch USER_LOGGED_IN event along with user profile
*/
export const socialLogin = (userProfile) => dispatch => {
    localStorage.newsJWT = userProfile.token
    localStorage.name = userProfile.name
    localStorage.email = userProfile.email
    dispatch(userLoggedIn(userProfile))
}

/*  This is a pattern for dispatching USER_LOGGED_IN event */
export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
})

/* This will remove user profile from localstorage and it will dispatch USER_LOGGED_OUT event */
export const logout = () => dispatch => {
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('newsJWT')
    dispatch(userLoggedOut())
};

/*  This is a pattern for dispatching USER_LOGGED_Out event */
export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
})
