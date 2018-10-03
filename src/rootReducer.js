import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer'
import newsReducer from './reducers/newsReducer'

export default combineReducers({
    user : userReducer,
    news: newsReducer
})