import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'

import { logout } from '../../actions/users'

class Header extends Component{

    /*  This will call a logout function  */
    onClick = e => {
        e.preventDefault()
        this.props.logout()
    }

    render(){
    const { isAuthenticated, name } = this.props

    return (
        <Menu stackable>        
            <Menu.Menu position="left">
                <Menu.Item>
                    <h5>News Portal</h5>
                </Menu.Item>
            </Menu.Menu>

            {/*  If User is logged in then it will render user name and a logout button in the menu bar */}
            
            {isAuthenticated &&<Menu.Menu position="right">
                <Menu.Item name="name">
                    <h5>{name}</h5>
                </Menu.Item>
                <Menu.Item name="logout" onClick={this.onClick}>
                    <h5>Log Out</h5>
                </Menu.Item>
            </Menu.Menu>}
        </Menu>
    )
}
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        isAuthenticated : !!state.user.token,
        name: state.user.name
    }
}

export default connect(mapStateToProps,{logout})(Header)

