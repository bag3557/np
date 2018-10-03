import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import FacebookLogin from 'react-facebook-login'
import { Message } from 'semantic-ui-react'

import { socialLogin } from '../../actions/users'
import Header from '../layout/Header'


/*  styles for GoogleLogin button 
*   this css same sa FacebookLogin button with red background
*/
const google ={
    fontFamily: 'Helvetica,sans-serif',
    fontWeight: '700',
    color: '#fff',
    cursor: 'pointer',
    display: 'inline-block',
    fontSize: 'calc(.27548vw + 12.71074px)',
    textDecoration: 'none',
    textTransform: 'uppercase',
    transition: 'background-color .3s,border-color .3s',
    backgroundColor: 'rgb(209, 72, 54)',
    border: 'calc(.06887vw + .67769px) solid rgb(209, 72, 54)',
    padding: 'calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)'
}

class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errors: {}
        }
    }

    /*  This function is to catch Google response for login
    *   It takes response object
    *   If there is any error occured while logging with google, 
    *   this will trigger error on screen, else redirect to login screen
    */
    responseGoogle = (response) => {      
        if(response.accessToken===undefined) this.loginFailure(response)
        else {
            var profile ={}
            try{
                profile.name = response.profileObj.name
                profile.email = response.profileObj.email
                profile.token = response.tokenObj.id_token
                this.loginSuccess(profile)
            }
            catch(err) {
                this.loginFailure(response)
            }
        }
    }

    /*  This function is to catch Facebook response for login
    *   It takes response object
    *   If there is any error occured while logging with google, 
    *   this will trigger error on screen, else redirect to login screen
    */
    responseFacebook = (response) => {           
        if(response.accessToken===undefined) this.loginFailure(response)
        else { 
            var profile ={}
            try{
                profile.name = response.name
                profile.email = response.email
                profile.token = response.accessToken
                this.loginSuccess(profile)
            }
            catch(err) {                
                this.loginFailure(response)
            }
        }
    }

    /*  This function will execute successful login
    *   This will redirect to news
    */
    loginSuccess = profile => {
        this.setState({ loading: false });
        this.props.socialLogin(profile)
        this.props.history.push('/news')
    }

    /*  This function will execute unsuccessful login
    *   This will trigger an error
    */
    loginFailure = errResponse => {
        const errorsOccured = {}
        errorsOccured.error = 'Something went wrong'            
        this.setState({ errors: errorsOccured });
    }
    
    render() {
        const { errors } = this.state;

        return (
            <div className="ui center aligned segment" style={{justifyContent: 'center'}}>

                <Header />
                <h1 className="ui header">
                    Login Page
                </h1>
                <GoogleLogin 
                    clientId="704079547447-pplekl5th15resoqe50krt1gl821fohm.apps.googleusercontent.com"
                    scope="profile"
                    buttonText="Login With Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    style={google}/>
                <FacebookLogin
                    appId="1883221665093689"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.responseFacebook}/>
                <br />
                {/* If there is any error in login, it will trigger an error message */}
                    {!!errors.error && <Message negative>
                        <Message.Header>Something went wrong, please try again...</Message.Header>
                        <p>{errors.global}</p>
                        </Message>}
            </div>
        )
    }
}

LoginPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    socialLogin: PropTypes.func.isRequired,
}

export default connect(null, { socialLogin }) (LoginPage)