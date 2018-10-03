import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

/*  This is a HOC
*   It will check if user is exist/logged-in or not
*   If user is logged-in, it will render news page
*   If user is not logged in, it will redirect to login page
*/
const GuestRoute = ({ isAuthenticated, component: Component, ...rest}) => {
  return (
    <Route 
        {...rest} 
        render={props => 
            isAuthenticated ? <Component {...props} /> : <Redirect to='/'/>}/>
  )
}

GuestRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
    return {
        isAuthenticated : !!state.user.token
    }
}

export default connect(mapStateToProps)(GuestRoute)

