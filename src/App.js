import React from 'react'
import { Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage'
import NewsPage from './components/pages/NewsPage'
import GuestRoute from './components/routes/GuestRoute'

const App = ({ location }) => 
      <div className="ui container">
        <Route location={location} path="/" exact component={LoginPage} />
        <GuestRoute location={location}  path="/news" exact component={NewsPage} />        
      </div>

export default App;
