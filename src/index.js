import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import registerServiceWorker from './registerServiceWorker'
import createHistory from 'history/createBrowserHistory'
import { logger } from 'redux-logger'

import App from './App'
import rootReducer from './rootReducer'
import { userLoggedIn } from './actions/users'


const history = createHistory()

const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk, logger))
);

/*
*   If user logged-in anytime in past and not logged-out
*   Get user details from localstorage and redirect to NewsPage: /news
*/
if(localStorage.newsJWT) {
    const userProfile = { token: localStorage.newsJWT, email: localStorage.email, name: localStorage.name};
    store.dispatch(userLoggedIn(userProfile));
    history.push('/news')
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route component={App} />
        </Provider>
    </BrowserRouter>, 
    document.getElementById('root')
);
registerServiceWorker();